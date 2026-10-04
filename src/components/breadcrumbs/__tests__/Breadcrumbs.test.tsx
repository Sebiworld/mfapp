import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { BreadcrumbDto } from "@models/utility-types/breadcrumb-dto.model";
import { Breadcrumbs } from "../Breadcrumbs";

const HOME: BreadcrumbDto = {
  id: 1,
  title: "Startseite",
  url: "/",
  httpUrl: "https://example.org/",
  viewable: true,
};
const PROJECT: BreadcrumbDto = {
  id: 2,
  title: "Annie",
  url: "/projekte/annie/",
  httpUrl: "https://example.org/projekte/annie/",
  viewable: true,
  active: true,
};

/**
 * Renders the breadcrumbs with the given items.
 * @param items - breadcrumb items
 * @returns the container element
 */
const renderCrumbs = (items: BreadcrumbDto[]): HTMLElement => {
  const { container } = render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      <MemoryRouter>
        <Breadcrumbs items={items} />
      </MemoryRouter>
    </ThemeProvider>
  );

  return container;
};

describe("Breadcrumbs", () => {
  it("shows nothing for a page whose path is only itself, since such a trail points nowhere", () => {
    const container = renderCrumbs([HOME]);

    expect(container.querySelector(".breadcrumbs")).toBeNull();
    expect(
      container.querySelector('script[type="application/ld+json"]')
    ).toBeNull();
  });

  it("shows the trail of a subpage", () => {
    const container = renderCrumbs([HOME, PROJECT]);

    expect(container.querySelector(".breadcrumbs")).not.toBeNull();
    expect(screen.getByRole("link", { name: "Startseite" })).toHaveAttribute(
      "href",
      "/"
    );
  });
});
