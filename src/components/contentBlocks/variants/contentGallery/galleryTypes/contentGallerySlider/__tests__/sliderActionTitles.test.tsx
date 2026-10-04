import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { ImageDto } from "@models/image-dto.model";
import { i18n } from "@utils/i18n/i18n";
import { ContentGallerySliderDefault } from "../components/ContentGallerySliderDefault";
import sliderDefault from "../components/ContentGallerySliderDefault.tsx?raw";
import sliderFeatured from "../components/ContentGallerySliderFeaturedSlider.tsx?raw";
import sliderPanorama from "../components/ContentGallerySliderPanoramaSlider.tsx?raw";
import articlesCarousel from "@components/sections/sectionArticlesCarousel/SectionArticlesCarousel.tsx?raw";
import featuredSlider from "@components/sections/sectionPagesGrid/featuredSlider/FeaturedSlider.tsx?raw";

vi.mock("@components/lazyPicture/LazyPicture", () => ({
  LazyPicture: () => <span />,
}));

/** Sources of every slider with previous/next buttons. */
const SLIDER_SOURCES: Record<string, string> = {
  ContentGallerySliderDefault: sliderDefault,
  ContentGallerySliderFeaturedSlider: sliderFeatured,
  ContentGallerySliderPanoramaSlider: sliderPanorama,
  SectionArticlesCarousel: articlesCarousel,
  FeaturedSlider: featuredSlider,
};

const IMAGES = ["probe-1.jpg", "probe-2.jpg"].map(
  (basename) =>
    ({
      basename,
      name: basename,
      description: basename,
      page_id: 4711,
      ext: "jpg",
      width: 1200,
      height: 800,
      modified: 1,
      filesize: 2,
    }) as ImageDto
);

describe("slider buttons", () => {
  it.each(Object.entries(SLIDER_SOURCES))(
    "%s only uses translation keys that exist",
    (_name, source) => {
      const keys = [...source.matchAll(/\bt\("([^"]+)"/g)].map(
        (match) => match[1]
      );

      expect(keys.length).toBeGreaterThan(0);
      expect(keys.filter((key) => !i18n.exists(key))).toEqual([]);
    }
  );

  it("shows translated titles on the previous and next buttons", () => {
    render(
      <ContentGallerySliderDefault
        images={IMAGES}
        activeIndex={0}
        setActiveIndex={() => undefined}
        openGallery={() => undefined}
      />
    );

    expect(screen.getByTitle("Zurück")).toHaveClass("action-prev");
    expect(screen.getByTitle("Weiter")).toHaveClass("action-next");
    expect(document.querySelector('[title^="general."]')).toBeNull();
  });
});
