import { describe, expect, it } from "vitest";
import { mfTheme } from "@styles/theme/mfTheme";
import { footerStyles } from "../footer.styles";

describe("footer styles", () => {
  // Cast: the sx function is only read here as a plain tree of selectors.
  const readStyles = (): Record<
    string,
    Record<string, Record<string, unknown>>
  > =>
    (
      footerStyles as unknown as (
        theme: typeof mfTheme
      ) => Record<string, Record<string, Record<string, unknown>>>
    )(mfTheme);

  it("animates nothing on the social actions", () => {
    expect(
      readStyles()[".mobile-reach-out"][".social-actions"]
    ).not.toHaveProperty("transition");
  });

  it("keeps the footer text to the reading measure of text blocks, with balanced lines", () => {
    // Cast: the sx function is only read here as a plain tree of selectors.
    const styles = (
      footerStyles as unknown as (
        theme: typeof mfTheme
      ) => Record<string, Record<string, Record<string, unknown>>>
    )(mfTheme);

    expect(styles[".footer"]["&>p"]).toMatchObject({
      maxWidth: "38em",
      textWrap: "balance",
    });
  });
});
