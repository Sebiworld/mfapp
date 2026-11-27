import { describe, expect, it } from "vitest";
import { globalContentStyles } from "../content.styles";

describe("global content styles", () => {
  // Cast: the style list is only read here as plain objects.
  const styles = (
    globalContentStyles as unknown as Record<
      string,
      Record<string, Record<string, unknown>>
    >[]
  )[0];

  it("scrolls smoothly by default", () => {
    expect(styles.html.scrollBehavior).toBe("smooth");
  });

  it("jumps instead of scrolling smoothly with reduced motion", () => {
    expect(
      styles["@media (prefers-reduced-motion: reduce)"].html.scrollBehavior
    ).toBe("auto");
  });
});
