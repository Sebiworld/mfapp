import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { pagesStoreActions } from "@src/store/pages/pages.actions";
import { nowInSeconds } from "@src/store/pageUnlocks/pageUnlocks.selectors";
import { Page } from "../Page";

type PageResult = PageDtoVariant | true | Error;

const loadPage = vi.fn();
vi.mock("@api/hooks/usePagesApi", () => ({
  usePagesApi: () => ({ loadPage }),
}));

// Records every page handed to the contents and keeps the reload callback.
const shownPages: (PageDtoVariant | undefined)[] = [];
let onUnlocked: (() => Promise<boolean>) | undefined;
vi.mock("../pageContents/PageContents", () => ({
  PageContents: (props: {
    page?: PageDtoVariant;
    onUnlocked?: () => Promise<boolean>;
  }) => {
    shownPages.push(props.page);
    onUnlocked = props.onUnlocked;
    return null;
  },
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
vi.mock("@components/errorCard/ErrorCard", () => ({
  ErrorCard: () => null,
}));
vi.mock("@src/context/appContext/useAppContext", () => ({
  useAppContext: () => ({}),
}));

const PATH = "/galerie/";

// Cast: only the fields Page reads are set.
const page = (fields: Record<string, unknown>): PageDtoVariant =>
  ({
    id: 7,
    url: PATH,
    title: "Galerie",
    template: { id: 1, name: "gallery", label: "Gallery" },
    ...fields,
  }) as unknown as PageDtoVariant;

const renderPage = (): void => {
  const router = createMemoryRouter([{ path: "*", element: <Page /> }], {
    initialEntries: [PATH],
  });

  render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

/**
 * Calls the reload callback; act must end before awaiting it, since the request starts in an effect.
 * @returns Whether the page arrived open.
 */
const reload = async (): Promise<boolean> => {
  let promise: Promise<boolean> = Promise.resolve(false);
  await act(async () => {
    promise = onUnlocked!();
  });
  return promise;
};

beforeEach(() => {
  loadPage.mockReset();
  shownPages.length = 0;
  onUnlocked = undefined;
  pagesStoreActions.resetSlice();
});

describe("Page with password protected pages", () => {
  it("does not draw a stored copy opened with an expired key", async () => {
    pagesStoreActions.addPage(
      PATH,
      page({ locked: false, expires: nowInSeconds() - 1, contents: [{}] })
    );
    let answer: (result: PageResult) => void = () => {};
    loadPage.mockImplementation(
      () => new Promise<PageResult>((resolve) => (answer = resolve))
    );

    renderPage();
    await waitFor(() => expect(loadPage).toHaveBeenCalled());

    expect(shownPages.every((shown) => shown === undefined)).toBe(true);

    await act(async () => answer(page({ locked: true })));
  });

  it("tells the password form whether the reload brought the page open", async () => {
    loadPage.mockResolvedValue(page({ locked: true }));
    renderPage();
    await waitFor(() => expect(onUnlocked).toBeDefined());

    // Still locked, then a failed request: the form has to become usable again.
    expect(await reload()).toBe(false);

    loadPage.mockResolvedValue(new Error("network down"));
    expect(await reload()).toBe(false);

    loadPage.mockResolvedValue(page({ locked: false, contents: [] }));
    expect(await reload()).toBe(true);
  });
});
