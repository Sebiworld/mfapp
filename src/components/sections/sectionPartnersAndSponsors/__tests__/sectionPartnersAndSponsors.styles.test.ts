import { describe, expect, it } from "vitest";
import { mfTheme } from "@styles/theme/mfTheme";
import { sectionPartnersAndSponsorsStyles } from "../sectionPartnersAndSponsors.styles";

type StyleTree = Record<string, Record<string, Record<string, unknown>>>;

// Cast: the sx function is only read here as a plain tree of selectors.
const styles = (
  sectionPartnersAndSponsorsStyles as unknown as (
    theme: typeof mfTheme
  ) => Record<string, StyleTree>
)(mfTheme)[".list-container.list-container"];

/** Selector under which the theme nests styles for the dark colour scheme. */
const DARK = Object.keys(mfTheme.applyStyles("dark", {}))[0];

describe("partners and sponsors styles in the dark scheme", () => {
  it("shows the sponsor logos light on dark tiles, and as they are on hover and focus", () => {
    const item = styles["&.sponsors-list"][".list-item"] as StyleTree;

    expect(String(item[DARK].filter)).toContain("invert(100%)");
    expect(item[DARK]["&:hover, &:focus"]).toEqual({ filter: "none" });
  });

  it("dims the white partner tiles instead of inverting their coloured logos", () => {
    const wrapper = styles[".list-item"][".item-wrapper"] as StyleTree;

    expect(String(wrapper[DARK].filter)).toContain("brightness(");
    expect(String(wrapper[DARK].filter)).not.toContain("invert");
  });
});
