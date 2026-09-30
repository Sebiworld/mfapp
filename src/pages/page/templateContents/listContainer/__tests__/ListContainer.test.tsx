import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { ListContainer } from "../ListContainer";
import { ListContainerPageDto } from "@models/page/list-container-page-dto.model";
import { GetPageListResponse } from "@api/axios/pageApi";
import { pagesStoreActions } from "@src/store/pages/pages.actions";
import { getFilterHash } from "@src/store/pages/pages.selectors";
import { PageCardDtoWithIndex } from "@src/store/pages/pages.store";

const loadPageListItems = vi.fn();
vi.mock("@api/hooks/usePagesApi", () => ({
  usePagesApi: () => ({ loadPageListItems }),
}));

// Cast: the component only reads project_id from the page.
const page = { id: 1, project_id: 3 } as unknown as ListContainerPageDto;

type ListResult = GetPageListResponse | true | Error;

interface PendingRequest {
  params: { offset?: number; limit?: number };
  resolve: (result: ListResult) => void;
}

// Collects every request with its own resolver so a test can answer them in any order.
const deferRequests = (): PendingRequest[] => {
  const pending: PendingRequest[] = [];
  loadPageListItems.mockImplementation(
    (params: PendingRequest["params"]) =>
      new Promise<ListResult>((resolve) => {
        pending.push({ params, resolve });
      })
  );
  return pending;
};

const findRequest = (
  pending: PendingRequest[],
  offset: number,
  limit: number
): PendingRequest => {
  const request = pending.find(
    (r) => r.params.offset === offset && r.params.limit === limit
  );

  if (!request) {
    throw new Error(`no request for offset ${offset}, limit ${limit}`);
  }

  return request;
};

// Cast: the list only filters and renders a few fields of a card.
const buildCard = (id: number): PageCardDtoWithIndex =>
  ({
    id,
    project_id: 3,
    name: `card-${id}`,
    url: `/card-${id}`,
    template: { id: 1, name: "article", label: "Article" },
    title: `Card ${id}`,
  }) as unknown as PageCardDtoWithIndex;

// Stands in for the store write that the real loadPageListItems does on a 200 response.
const storeCard = (id: number, startIndex: number): void => {
  pagesStoreActions.addPageCards([buildCard(id)], {
    indexKey: "3",
    filterHash: getFilterHash(undefined, undefined),
    startIndex,
  });
};

// A memory router lets a test navigate from outside the rendered tree.
let router: ReturnType<typeof createMemoryRouter>;

const renderList = () => {
  router = createMemoryRouter(
    [{ path: "*", element: <ListContainer page={page} /> }],
    {
      initialEntries: ["/liste"],
    }
  );

  return render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

describe("ListContainer", () => {
  const scrollIntoView = vi.fn();

  beforeEach(() => {
    pagesStoreActions.resetSlice();
    loadPageListItems.mockReset();
    scrollIntoView.mockReset();
    // jsdom does not implement scrollIntoView.
    Element.prototype.scrollIntoView = scrollIntoView;
  });

  it("requests the meta data and the first page on mount", async () => {
    loadPageListItems.mockResolvedValue({ totalNumber: 30 });

    renderList();

    await waitFor(() => {
      expect(loadPageListItems).toHaveBeenCalledTimes(2);
    });
    expect(loadPageListItems).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ projectId: 3, offset: 0, limit: 0 })
    );
    expect(loadPageListItems).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ projectId: 3, offset: 0, limit: 12 })
    );
  });

  it("scrolls to the list top and sizes the pagination after a load", async () => {
    loadPageListItems.mockResolvedValue({ totalNumber: 30 });

    const { container } = renderList();

    expect(await screen.findByLabelText("Go to page 3")).toBeInTheDocument();
    expect(screen.queryByLabelText("Go to page 4")).not.toBeInTheDocument();
    await waitFor(() => {
      expect(scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      });
    });
    expect(scrollIntoView.mock.contexts[0]).toBe(
      container.querySelector("#list-top")
    );
  });

  it("does not scroll when the load fails", async () => {
    loadPageListItems.mockResolvedValue(new Error("network down"));

    renderList();

    await waitFor(() => {
      expect(loadPageListItems).toHaveBeenCalledTimes(2);
    });
    await Promise.all(loadPageListItems.mock.results.map((r) => r.value));
    await Promise.resolve();
    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it("keeps the overlay until the page response arrives, even after the meta response", async () => {
    const pending = deferRequests();

    renderList();

    await waitFor(() => {
      expect(pending).toHaveLength(2);
    });
    expect(screen.getByTestId("loading-overlay")).toBeInTheDocument();

    await act(async () => {
      findRequest(pending, 0, 0).resolve({
        totalNumber: 30,
      } as GetPageListResponse);
    });
    expect(screen.getByTestId("loading-overlay")).toBeInTheDocument();

    await act(async () => {
      findRequest(pending, 0, 12).resolve(true);
    });
    expect(screen.queryByTestId("loading-overlay")).not.toBeInTheDocument();
  });

  it("requests a page changed during a running load and drops the stale response", async () => {
    const pending = deferRequests();

    renderList();

    await waitFor(() => {
      expect(pending).toHaveLength(2);
    });

    await act(async () => {
      router.navigate("/liste?page=2");
    });

    await waitFor(() => {
      expect(loadPageListItems).toHaveBeenCalledWith(
        expect.objectContaining({ projectId: 3, offset: 12, limit: 12 })
      );
    });

    // The first page answers late: it must neither end the loading of page 2 nor size the pagination.
    await act(async () => {
      storeCard(101, 0);
      findRequest(pending, 0, 12).resolve({
        totalNumber: 60,
      } as GetPageListResponse);
    });
    expect(screen.getByTestId("loading-overlay")).toBeInTheDocument();
    expect(screen.queryByLabelText("Go to page 5")).not.toBeInTheDocument();
    expect(scrollIntoView).not.toHaveBeenCalled();

    await act(async () => {
      storeCard(113, 12);
      findRequest(pending, 12, 12).resolve({
        totalNumber: 30,
      } as GetPageListResponse);
    });
    expect(screen.queryByTestId("loading-overlay")).not.toBeInTheDocument();
    expect(screen.getByText("Card 113")).toBeInTheDocument();
    expect(screen.getByLabelText("page 2")).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByLabelText("Go to page 3")).toBeInTheDocument();
    expect(screen.queryByLabelText("Go to page 5")).not.toBeInTheDocument();
  });

  it("keeps loading after returning to a page until the newest request answers", async () => {
    const pending = deferRequests();

    renderList();
    await waitFor(() => {
      expect(pending).toHaveLength(2);
    });
    await act(async () => {
      findRequest(pending, 0, 12).resolve(true);
    });
    expect(screen.queryByTestId("loading-overlay")).not.toBeInTheDocument();

    await act(async () => {
      router.navigate("/liste?page=2");
    });
    await act(async () => {
      router.navigate("/liste");
    });
    await waitFor(() => {
      expect(pending.filter((r) => r.params.limit === 12)).toHaveLength(3);
    });

    expect(screen.getByTestId("loading-overlay")).toBeInTheDocument();

    await act(async () => {
      findRequest(pending, 12, 12).resolve(true);
    });
    expect(screen.getByTestId("loading-overlay")).toBeInTheDocument();

    const pageRequests = pending.filter((r) => r.params.limit === 12);
    await act(async () => {
      pageRequests[2].resolve(true);
    });
    expect(screen.queryByTestId("loading-overlay")).not.toBeInTheDocument();
  });
});
