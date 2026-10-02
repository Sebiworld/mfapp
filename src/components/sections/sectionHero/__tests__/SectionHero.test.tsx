import { describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { SectionDto } from "@models/section/section-dto.model";
import { ImageDto } from "@models/image-dto.model";
import { SectionHero } from "../SectionHero";
import { sectionHeroStyles } from "../section-hero.styles";

vi.mock("@components/lazyPicture/LazyPicture", () => ({
  LazyPicture: () => <img alt="" />,
}));
vi.mock("@components/contentBlocks/ContentBlocks", () => ({
  ContentBlocks: () => null,
}));

/**
 * Renders a hero with the given image ratio.
 * @param ratio - `dimension_ratio` of the main image, or none
 * @returns the hero image box
 */
const renderHero = (ratio?: number): HTMLElement => {
  // Cast: only the fields read by SectionHero are set.
  const section = {
    id: 1,
    type: "hero",
    section_name: "hero",
    title: "",
    main_image: { basename: "hero.jpg", dimension_ratio: ratio } as ImageDto,
  } as SectionDto;
  const { container } = render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      <SectionHero section={section} />
    </ThemeProvider>
  );

  return container.querySelector(".hero-image") as HTMLElement;
};

describe("SectionHero", () => {
  it("passes the image ratio to the styles, so the hero has a height it can animate from", () => {
    expect(renderHero(2.34).style.getPropertyValue("--hero-ratio")).toBe(
      "2.34"
    );
  });

  it("sets no ratio without one, so the hero keeps the height of its image", () => {
    expect(renderHero(0).style.getPropertyValue("--hero-ratio")).toBe("");
    expect(renderHero().style.getPropertyValue("--hero-ratio")).toBe("");
  });

  it("follows a height limit from the page smoothly on large screens, without motion when reduced motion is set", () => {
    // Cast: the sx function is only read here as a plain tree of selectors.
    const styles = (
      sectionHeroStyles as unknown as (
        theme: typeof mfTheme
      ) => Record<string, Record<string, Record<string, unknown>>>
    )(mfTheme);
    const image = styles[".hero-image"][mfTheme.breakpoints.up("lg")];

    expect(String(image.height)).toContain("var(--hero-max-height");
    expect(String(image.transition)).toContain("height");
    expect(image["@media (prefers-reduced-motion: reduce)"]).toEqual({
      transition: "none",
    });
  });
});
