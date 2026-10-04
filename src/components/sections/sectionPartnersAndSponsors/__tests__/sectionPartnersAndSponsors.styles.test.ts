import { describe, expect, it } from "vitest";
import { mfTheme } from "@styles/theme/mfTheme";
import { sectionPartnersAndSponsorsStyles } from "../sectionPartnersAndSponsors.styles";

interface StyleTree {
  [selector: string]: StyleTree;
}

// Cast: the sx function is only read here as a plain tree of selectors.
const styles = (
  sectionPartnersAndSponsorsStyles as unknown as (
    theme: typeof mfTheme
  ) => Record<string, StyleTree>
)(mfTheme)[".list-container.list-container"] as unknown as StyleTree;

/** Selector under which the theme nests styles for the dark colour scheme. */
const DARK = Object.keys(mfTheme.applyStyles("dark", {}))[0];
const HOVER_MEDIA = "@media (hover: hover)";
const WRAPPER = ".list-item .item-wrapper";

const sponsors = (styles["&.sponsors-list"] ?? {}) as StyleTree;
const partners = (styles["&.partners-list"] ?? {}) as StyleTree;
const sponsorWrapper = (sponsors[WRAPPER] ?? {}) as StyleTree;
const partnerWrapper = (partners[WRAPPER] ?? {}) as StyleTree;
const hoverRule = ((sponsors[HOVER_MEDIA] ?? {}) as StyleTree)[
  ".list-item:hover .item-wrapper, .list-item:focus-visible .item-wrapper"
] as StyleTree | undefined;

const filterOf = (tree: unknown): string =>
  String((tree as { filter?: unknown }).filter ?? "");

describe("partners and sponsors styles", () => {
  it("filters a sponsor logo once, on the image, and light on dark in the dark scheme", () => {
    expect(filterOf(sponsorWrapper.img)).toBe("grayscale(100%)");
    const darkImg = ((sponsorWrapper[DARK] ?? {}) as StyleTree).img;
    expect(filterOf(darkImg)).toContain("grayscale(100%)");
    expect(filterOf(darkImg)).toContain("invert(100%)");
  });

  it("keeps filters off the sponsor tile and wrapper (nested filters break in iOS Safari)", () => {
    const tree = JSON.stringify(styles);
    // Any filter must sit under an `img` key.
    const withoutImgFilters = tree.replace(/"img":\{"filter":"[^"]*"(,"transition":"[^"]*")?\}/g, "");
    expect(withoutImgFilters).not.toContain('"filter"');
    expect(styles[".list-item"]).not.toHaveProperty("filter");
    expect(sponsors).not.toHaveProperty(".list-item");
    expect(sponsorWrapper).not.toHaveProperty("filter");
    expect(sponsorWrapper[DARK]).not.toHaveProperty("filter");
  });

  it("dims only the partner image in the dark scheme, without inverting it", () => {
    const img = ((partnerWrapper[DARK] ?? {}) as StyleTree).img;
    expect(filterOf(img)).toContain("brightness(");
    expect(filterOf(img)).not.toContain("invert");
  });

  it("switches sponsor logos to their original only where hover exists", () => {
    // Nothing outside the media query reacts to hover or focus.
    expect(Object.keys(sponsors).filter((k) => k !== HOVER_MEDIA && /hover|focus/.test(k))).toEqual([]);
    expect(Object.keys(sponsorWrapper).filter((k) => /hover|focus/.test(k))).toEqual([]);
    expect(filterOf(hoverRule?.img)).toBe("none");
    expect(Object.keys(hoverRule ?? {})).toContain(DARK);
  });

  it("animates the logo colour only where hover exists", () => {
    const mediaWrapper = ((sponsors[HOVER_MEDIA] ?? {}) as StyleTree)[WRAPPER] as StyleTree | undefined;
    expect(String((mediaWrapper?.img as unknown as { transition?: string } | undefined)?.transition)).toContain("filter");
    expect(JSON.stringify(sponsorWrapper)).not.toContain("transition");
  });
});
