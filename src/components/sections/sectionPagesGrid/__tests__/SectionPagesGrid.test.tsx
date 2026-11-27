import { describe, expect, it, vi } from "vitest";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import "@utils/i18n/i18n";
import { resetMatchMedia, setReducedMotion } from "@src/test/motion";
import { MemoryRouter } from "react-router";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { SectionPagesGridDto } from "@models/section/section-pages-grid-dto.model";
import { SectionPagesGrid } from "../SectionPagesGrid";
import { Box } from "@mui/material";
import { sectionContainerStyles } from "../../sectionsContainer.styles";

// Masonry and the slider need layout APIs jsdom lacks; the tests only check which view the section picks.
vi.mock("../pagesGrid/PagesGrid", () => ({
  PagesGrid: () => <div data-testid="pages-grid" />,
}));
vi.mock("../featuredSlider/FeaturedSlider", () => ({
  FeaturedSlider: () => <div data-testid="featured-slider" />,
}));
vi.mock("@components/lazyPicture/LazyPicture", () => ({
  LazyPicture: () => <img alt="" />,
}));
vi.mock("@components/contentBlocks/ContentBlocks", () => ({
  ContentBlocks: () => null,
}));

/**
 * Builds a pages grid section with three cards.
 * @param classes - CMS classes of the section
 * @returns the section DTO
 */
const buildSection = (classes: string): SectionPagesGridDto =>
  // Cast: only the fields read by SectionPagesGrid and its views are set.
  ({
    type: "pages-grid",
    id: 1,
    section_name: "bereiche",
    title: "Bereiche",
    classes,
    cards: [
      {
        id: 11,
        title: "Sologesang",
        url: "/bereiche/sologesang/",
        main_image: { id: 1 },
      },
      {
        id: 12,
        title: "Chorgesang &amp; Ensemble",
        url: "/bereiche/chor/",
        main_image: { id: 2 },
      },
      { id: 13, title: "Tanz", url: "/bereiche/tanz/" },
    ],
  }) as unknown as SectionPagesGridDto;

/**
 * Renders a pages grid section inside router and theme.
 * @param classes - CMS classes of the section
 * @returns the rendered section element
 */
const renderSection = (classes: string): HTMLElement => {
  const { container } = render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      <MemoryRouter>
        <Box sx={sectionContainerStyles}>
          <SectionPagesGrid section={buildSection(classes)} />
        </Box>
      </MemoryRouter>
    </ThemeProvider>
  );

  return container.querySelector("section") as HTMLElement;
};

describe("SectionPagesGrid", () => {
  it("shows the cards as a photo mosaic of title links with the tiles-mosaic class", () => {
    renderSection("tiles-mosaic spacer-down");

    const mosaic = screen.getByTestId("pages-mosaic");

    expect(screen.queryByTestId("pages-grid")).toBeNull();
    expect(
      within(mosaic)
        .getAllByRole("link")
        .map((link) => [link.textContent, link.getAttribute("href")])
    ).toEqual([
      ["Sologesang", "/bereiche/sologesang/"],
      ["Chorgesang & Ensemble", "/bereiche/chor/"],
      ["Tanz", "/bereiche/tanz/"],
    ]);
  });

  it("keeps the card grid without the class", () => {
    renderSection("spacer-down");

    expect(screen.getByTestId("pages-grid")).toBeInTheDocument();
    expect(screen.queryByTestId("pages-mosaic")).toBeNull();
  });

  it("sets an aside section in two columns, text beside the cards", () => {
    const section = renderSection("aside");

    expect(getComputedStyle(section).display).toBe("grid");
  });

  it("keeps the tiles inside the content width with the section's own bottom padding", () => {
    const section = renderSection("tiles-mosaic spacer-down");
    const mosaic = screen.getByTestId("pages-mosaic");

    expect(getComputedStyle(mosaic).marginLeft).toMatch(/^0(px)?$/);
    expect(getComputedStyle(section).paddingBottom).not.toMatch(/^0(px)?$/);
  });

  it("fades the see-all dialog out before removing it", async () => {
    // The file stands the slider in; this test needs the real one with its dialog.
    const { FeaturedSlider } = await vi.importActual<
      typeof import("../featuredSlider/FeaturedSlider")
    >("../featuredSlider/FeaturedSlider");

    // Swiper fills a missing `matchMedia` with a bare stub that MUI cannot listen to.
    setReducedMotion(false);
    render(
      <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
        <MemoryRouter>
          <FeaturedSlider section={buildSection("featured")} />
        </MemoryRouter>
      </ThemeProvider>
    );

    vi.useFakeTimers();

    try {
      fireEvent.click(screen.getByRole("button", { name: "Alle ansehen" }));

      const dialog = screen.getByTestId("section-featured-slider-modal");
      const paper = dialog.querySelector(".modal-container");

      expect(paper).toHaveAttribute("data-motion", "enter");

      fireEvent.click(within(dialog).getByTitle("Schließen"));

      expect(screen.getByTestId("section-featured-slider-modal")).toBe(dialog);
      expect(paper).toHaveAttribute("data-motion", "exit");

      act(() => {
        vi.advanceTimersByTime(150);
      });

      expect(screen.queryByTestId("section-featured-slider-modal")).toBeNull();
    } finally {
      vi.useRealTimers();
      resetMatchMedia();
    }
  });
});
