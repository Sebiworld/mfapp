import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { useGlobalStore } from "@src/store/global.store";
import { pagesStoreActions } from "@src/store/pages/pages.actions";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { Header } from "../Header";
import { TranslucentHeaderContext } from "../useTranslucentHeader";

vi.mock("@core/sidemenu/Sidemenu", () => ({ Sidemenu: () => null }));

const HERO_PAGE = {
  id: 1,
  sections: [{ type: "hero" }],
} as unknown as PageDtoVariant; // only the fields the header reads

const TEXT_PAGE = {
  id: 2,
  sections: [{ type: "page" }],
} as unknown as PageDtoVariant; // only the fields the header reads

/**
 * Renders the header inside a shell element for the given path.
 * @param path Current path.
 * @param isTranslucent Whether the shown page lets the header lie translucent.
 * @returns The rendered header element.
 */
const renderHeader = (path: string, isTranslucent = false): HTMLElement => {
  const router = createMemoryRouter(
    [
      {
        path: "*",
        element: (
          <TranslucentHeaderContext.Provider
            value={{ isTranslucent, setTranslucent: () => undefined }}
          >
            <div data-testid="shell">
              <Header />
            </div>
          </TranslucentHeaderContext.Provider>
        ),
      },
    ],
    { initialEntries: [path] }
  );

  render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      <RouterProvider router={router} />
    </ThemeProvider>
  );

  return screen.getByRole("banner");
};

describe("Header", () => {
  beforeEach(() => {
    useGlobalStore.setState({ pages: {} });
  });

  it("stays fixed on a page without hero, so a later switch to the translucent variant moves no content", () => {
    pagesStoreActions.addPage("/kurse", TEXT_PAGE);

    const header = renderHeader("/kurse");

    expect(header).toHaveClass("MuiAppBar-positionFixed");
    expect(header).not.toHaveClass("translucent");
  });

  it("stays fixed and solid while a stored hero page is not shown yet", () => {
    pagesStoreActions.addPage("/", HERO_PAGE);

    const header = renderHeader("/");

    expect(header).toHaveClass("MuiAppBar-positionFixed");
    expect(header).not.toHaveClass("translucent");
  });

  it("turns translucent when the shown page starts with a hero", () => {
    const header = renderHeader("/", true);

    expect(header).toHaveClass("MuiAppBar-positionFixed");
    expect(header).toHaveClass("translucent");
  });

  it("publishes its height on its parent, where the layout reads it", () => {
    const header = renderHeader("/kurse");

    expect(
      screen.getByTestId("shell").style.getPropertyValue("--header-height")
    ).toBe(`${header.offsetHeight}px`);
  });
});
