import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { useGlobalStore } from "@src/store/global.store";
import { pagesStoreActions } from "@src/store/pages/pages.actions";
import { clearProjectDetailsPrefetch } from "@api/prefetch/projectDetailsPrefetch";
import { clearNextPerformancesPrefetch } from "@api/prefetch/nextPerformancesPrefetch";
import { PROJECT_DATA_MAX_WAIT_MS } from "@api/hooks/usePrefetchProjectData";
import { Layout } from "@core/Layout";
import { Page } from "../Page";

const loadPage = vi.fn();
vi.mock("@api/hooks/usePagesApi", () => ({
  usePagesApi: () => ({ loadPage }),
}));

const loadProjectDetails = vi.fn();
vi.mock("@api/hooks/useProjectsApi", () => ({
  useProjectsApi: () => ({ loadProjectDetails }),
}));

const loadNextPerformances = vi.fn();
vi.mock("@api/hooks/usePerformancesApi", () => ({
  usePerformancesApi: () => ({ loadNextPerformances }),
}));

// Only whether the contents are shown is under test here.
vi.mock("../pageContents/PageContents", () => ({
  PageContents: ({ page }: { page?: PageDtoVariant }) =>
    page ? <div data-testid="contents" /> : null,
}));
vi.mock("../projectPage/ProjectPage", () => ({
  ProjectPage: ({ children }: { children?: React.ReactNode }) => (
    <>{children}</>
  ),
}));
vi.mock("@components/breadcrumbs/Breadcrumbs", () => ({
  Breadcrumbs: () => null,
}));
vi.mock("@components/SeoHeaders", () => ({ SeoHeaders: () => null }));
vi.mock("@src/context/appContext/useAppContext", () => ({
  useAppContext: () => ({}),
}));
vi.mock("react-toastify", () => ({ ToastContainer: () => null }));
vi.mock("@core/header/Header", () => ({ Header: () => null }));
vi.mock("@core/footer/Footer", () => ({ Footer: () => null }));

const PROJECT_PAGE = {
  id: 10,
  project_id: 3,
  template: { id: 1, name: "project", label: "Projekt" },
} as unknown as PageDtoVariant; // only the fields the page reads

const HERO_PAGE = {
  id: 1,
  template: { id: 2, name: "home", label: "Start" },
  sections: [{ type: "hero" }],
} as unknown as PageDtoVariant; // only the fields the page reads

interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
}

const defer = <T,>(): Deferred<T> => {
  let resolve: (value: T) => void = () => undefined;
  const promise = new Promise<T>((r) => {
    resolve = r;
  });

  return { promise, resolve };
};

/**
 * Lets the page request answer with the page, storing it like the real request does.
 * @param page The page to answer with.
 */
const answerWith = (page: PageDtoVariant): void => {
  loadPage.mockImplementation(async (path: string) => {
    pagesStoreActions.addPage(path, page);

    return page;
  });
};

const renderPage = (path: string) => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [{ path: "*", element: <Page /> }],
      },
    ],
    { initialEntries: [path] }
  );

  return render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

describe("Page with project data", () => {
  beforeEach(() => {
    useGlobalStore.setState({ pages: {}, projects: {} });
    clearProjectDetailsPrefetch();
    clearNextPerformancesPrefetch();
    loadPage.mockReset();
    loadProjectDetails.mockReset();
    loadNextPerformances.mockReset();
    loadProjectDetails.mockResolvedValue(true);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("shows a project page only once project details and next performance have answered", async () => {
    const details = defer<true>();
    const next = defer<{ hash: string }>();
    loadProjectDetails.mockReturnValue(details.promise);
    loadNextPerformances.mockReturnValue(next.promise);
    answerWith(PROJECT_PAGE);

    renderPage("/projekte/x/");

    await waitFor(() => {
      expect(loadNextPerformances).toHaveBeenCalledWith(3, undefined);
    });
    expect(loadProjectDetails).toHaveBeenCalledWith(3);
    expect(screen.queryByTestId("contents")).toBeNull();
    expect(screen.getByTestId("page")).toHaveClass("is-awaiting-content");

    await act(async () => {
      details.resolve(true);
    });
    expect(screen.queryByTestId("contents")).toBeNull();

    await act(async () => {
      next.resolve({ hash: "h" });
    });
    expect(screen.getByTestId("contents")).toBeInTheDocument();
  });

  it("requests the project data as soon as the project is known from the path", async () => {
    useGlobalStore.setState({
      projects: {
        3: { id: 3, url: "/projekte/x/" },
      } as unknown as ReturnType<typeof useGlobalStore.getState>["projects"], // only the fields the page reads
    });
    loadPage.mockReturnValue(new Promise(() => undefined));
    loadNextPerformances.mockReturnValue(new Promise(() => undefined));

    renderPage("/projekte/x/");

    await waitFor(() => {
      expect(loadProjectDetails).toHaveBeenCalledWith(3);
    });
    expect(loadNextPerformances).toHaveBeenCalledWith(3, undefined);
  });

  it("does not hold the page back when the next performance request fails", async () => {
    const next = defer<Error>();
    loadNextPerformances.mockReturnValue(next.promise);
    answerWith(PROJECT_PAGE);

    renderPage("/projekte/x/");

    await waitFor(() => {
      expect(loadNextPerformances).toHaveBeenCalled();
    });
    expect(screen.queryByTestId("contents")).toBeNull();

    // Shown right after the failure, not only after the longest wait.
    await act(async () => {
      next.resolve(new Error("offline"));
    });
    expect(screen.getByTestId("contents")).toBeInTheDocument();
  });

  it("shows the page after the longest wait when a request hangs", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    loadNextPerformances.mockReturnValue(new Promise(() => undefined));
    answerWith(PROJECT_PAGE);

    renderPage("/projekte/x/");

    await waitFor(() => {
      expect(loadNextPerformances).toHaveBeenCalled();
    });
    expect(screen.queryByTestId("contents")).toBeNull();

    await act(async () => {
      await vi.advanceTimersByTimeAsync(PROJECT_DATA_MAX_WAIT_MS);
    });
    expect(screen.getByTestId("contents")).toBeInTheDocument();
  });

  it("keeps the header solid while a stored hero page is not shown yet", async () => {
    const page = defer<PageDtoVariant>();
    loadPage.mockImplementation(async (path: string) => {
      pagesStoreActions.addPage(path, HERO_PAGE);

      return page.promise;
    });

    const { container } = renderPage("/start/");
    const mainContent = container.querySelector(".main-content");

    await waitFor(() => {
      expect(useGlobalStore.getState().pages["/start/"]).toBeDefined();
    });
    expect(mainContent).not.toHaveClass("below-translucent-header");

    await act(async () => {
      page.resolve(HERO_PAGE);
    });
    expect(screen.getByTestId("contents")).toBeInTheDocument();
    expect(mainContent).toHaveClass("below-translucent-header");
  });
});
