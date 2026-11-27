import { describe, expect, it } from "vitest";
import { Theme } from "@mui/material";
import { mfTheme } from "@styles/theme/mfTheme";
import { headerStyles } from "../header.styles";

type StyleObject = Record<string, unknown>;

// Cast: the header styles are a theme callback; only plain objects are read here.
const styles = (headerStyles as unknown as (theme: Theme) => StyleObject)(
  mfTheme as unknown as Theme
);
const translucent = styles["&.translucent"] as Record<string, StyleObject>;
const reducedMotion = styles["@media (prefers-reduced-motion: reduce)"] as
  StyleObject | undefined;

describe("header styles", () => {
  it("blends the bar between translucent and solid", () => {
    expect(styles.transition).toBe(
      "background-color 200ms var(--mf-ease-out), color 200ms var(--mf-ease-out), box-shadow 200ms var(--mf-ease-out)"
    );
    expect(styles.transition).not.toMatch(/backdrop-filter/);
    expect(reducedMotion?.transitionDuration).toBe("100ms");
  });

  it("fades the logo in and keeps it unfocusable while hidden", () => {
    expect(translucent[".hide-when-translucent"]).toMatchObject({
      visibility: "hidden",
      opacity: 0,
    });
    expect(translucent[".hide-when-translucent"].transition).toContain(
      "visibility 0s linear 150ms"
    );
    expect(styles[".hide-when-translucent"]).toMatchObject({
      visibility: "visible",
      opacity: 1,
      transition: "opacity 150ms var(--mf-ease-out), visibility 0s",
    });
  });
});
