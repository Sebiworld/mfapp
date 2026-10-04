import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { Page } from "../Page";

const loadPage = vi.fn();
vi.mock("@api/hooks/usePagesApi", () => ({
  usePagesApi: () => ({ loadPage }),
}));

// The page frame is not under test here; only loading state and error display are.
vi.mock("../projectPage/ProjectPage", () => ({
  ProjectPage: ({ children }: { children?: React.ReactNode }) => (
    <>{children}</>
  ),
}));
vi.mock("../pageContents/PageContents", () => ({ PageContents: () => null }));
vi.mock("@components/breadcrumbs/Breadcrumbs", () => ({
  Breadcrumbs: () => null,
}));
vi.mock("@components/SeoHeaders", () => ({ SeoHeaders: () => null }));
vi.mock("@components/errorCard/ErrorCard", () => ({
  ErrorCard: () => <div data-testid="error-card" />,
}));
vi.mock("@src/context/appContext/useAppContext", () => ({
  useAppContext: () => ({}),
}));

type PageResult = PageDtoVariant | true | Error;

interface PendingLoad {
  path: string;
  resolve: (result: PageResult) => void;
}

// Collects every request with its own resolver so a test can answer them in any order.
const deferLoads = (): PendingLoad[] => {
  const pending: PendingLoad[] = [];
  loadPage.mockImplementation(
    (path: string) =>
      new Promise<PageResult>((resolve) => {
        pending.push({ path, resolve });
      })
  );
  return pending;
};

const findLoad = (pending: PendingLoad[], path: string): PendingLoad => {
  const load = pending.find((l) => l.path === path);

  if (!load) {
    throw new Error(`no request for ${path}`);
  }

  return load;
};

// A memory router lets a test navigate from outside the rendered tree.
let router: ReturnType<typeof createMemoryRouter>;

const renderPage = (path: string) => {
  router = createMemoryRouter([{ path: "*", element: <Page /> }], {
    initialEntries: [path],
  });

  return render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

describe("Page", () => {
  beforeEach(() => {
    loadPage.mockReset();
  });

  it("shows the loading overlay until the page response arrives", async () => {
    const pending = deferLoads();

    renderPage("/kurse");

    expect(screen.getByTestId("loading-overlay")).toBeInTheDocument();
    await waitFor(() => {
      expect(pending).toHaveLength(1);
    });

    await act(async () => {
      findLoad(pending, "/kurse").resolve(true);
    });
    expect(screen.queryByTestId("loading-overlay")).not.toBeInTheDocument();
  });

  it("keeps room for a whole screen until the first content of the page arrives", async () => {
    const pending = deferLoads();

    renderPage("/kurse");

    // Without the room the footer would show right below the header and be pushed down by the content.
    expect(screen.getByTestId("page")).toHaveClass("is-awaiting-content");
    await waitFor(() => {
      expect(pending).toHaveLength(1);
    });

    await act(async () => {
      findLoad(pending, "/kurse").resolve(true);
    });
    expect(screen.getByTestId("page")).not.toHaveClass("is-awaiting-content");
  });

  it("shows the error card when the current page fails to load", async () => {
    const pending = deferLoads();

    renderPage("/kurse");
    await waitFor(() => {
      expect(pending).toHaveLength(1);
    });

    await act(async () => {
      findLoad(pending, "/kurse").resolve(new Error("not found"));
    });
    expect(screen.getByTestId("error-card")).toBeInTheDocument();
    expect(screen.queryByTestId("loading-overlay")).not.toBeInTheDocument();
  });

  it("ignores a late response for a path that is no longer current", async () => {
    const pending = deferLoads();

    renderPage("/kurse");
    await waitFor(() => {
      expect(pending).toHaveLength(1);
    });

    await act(async () => {
      router.navigate("/team");
    });
    await waitFor(() => {
      expect(loadPage).toHaveBeenLastCalledWith("/team");
    });

    // The previous path fails after the navigation: that must neither end loading nor show its error.
    await act(async () => {
      findLoad(pending, "/kurse").resolve(new Error("not found"));
    });
    expect(screen.getByTestId("loading-overlay")).toBeInTheDocument();
    expect(screen.queryByTestId("error-card")).not.toBeInTheDocument();

    await act(async () => {
      findLoad(pending, "/team").resolve(true);
    });
    expect(screen.queryByTestId("loading-overlay")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error-card")).not.toBeInTheDocument();
  });

  it("keeps loading after returning to a path until the newest request answers", async () => {
    const pending = deferLoads();

    renderPage("/kurse");
    await waitFor(() => {
      expect(pending).toHaveLength(1);
    });
    await act(async () => {
      pending[0].resolve(true);
    });
    expect(screen.queryByTestId("loading-overlay")).not.toBeInTheDocument();

    await act(async () => {
      router.navigate("/team");
    });
    await act(async () => {
      router.navigate("/kurse");
    });
    await waitFor(() => {
      expect(pending).toHaveLength(3);
    });

    // A response for the superseded "/team" request must not end loading for the newest request ("/kurse").
    expect(screen.getByTestId("loading-overlay")).toBeInTheDocument();

    await act(async () => {
      pending[1].resolve(true);
    });
    expect(screen.getByTestId("loading-overlay")).toBeInTheDocument();

    await act(async () => {
      pending[2].resolve(new Error("not found"));
    });
    expect(screen.queryByTestId("loading-overlay")).not.toBeInTheDocument();
    expect(screen.getByTestId("error-card")).toBeInTheDocument();
  });
});
