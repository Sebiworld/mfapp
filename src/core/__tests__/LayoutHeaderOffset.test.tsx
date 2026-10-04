import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { PageDtoVariant } from "@models/page/page-dto-variant.model";
import { Layout } from "../Layout";
import { useShowPageBelowHeader } from "../header/useTranslucentHeader";

vi.mock("react-toastify", () => ({ ToastContainer: () => null }));
vi.mock("../header/Header", () => ({ Header: () => null }));
vi.mock("../footer/Footer", () => ({ Footer: () => null }));

const HERO_PAGE = {
  id: 1,
  sections: [{ type: "hero" }],
} as unknown as PageDtoVariant; // only the fields the layout reads

/**
 * Route element that shows the given page.
 * @param props.page Shown page, or none.
 * @returns An empty page element.
 */
const ShownPage = ({ page }: { page?: PageDtoVariant }) => {
  useShowPageBelowHeader(page);

  return <div className="page" />;
};

/**
 * Renders the layout with a route element that shows the given page.
 * @param page Shown page, or none.
 * @returns The main content element.
 */
const renderLayout = (page?: PageDtoVariant): HTMLElement => {
  const router = createMemoryRouter(
    [
      {
        path: "/",
        element: <Layout />,
        children: [{ path: "*", element: <ShownPage page={page} /> }],
      },
    ],
    { initialEntries: ["/start/"] }
  );

  const { container } = render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      <RouterProvider router={router} />
    </ThemeProvider>
  );

  return container.querySelector(".main-content") as HTMLElement;
};

describe("Layout header room", () => {
  it("lets a shown page that starts with a hero begin below the translucent header", () => {
    expect(renderLayout(HERO_PAGE)).toHaveClass("below-translucent-header");
  });

  it("keeps the header room while no page is shown", () => {
    expect(renderLayout()).not.toHaveClass("below-translucent-header");
  });
});
