import { describe, expect, it } from "vitest";
import { loadingOverlayStyles } from "../loadingOverlay.styles";

// Cast: the overlay styles are a plain object; only its values are read here.
const styles = loadingOverlayStyles as unknown as Record<
  string,
  Record<string, unknown> | string
>;
const reducedMotion = styles["@media (prefers-reduced-motion: reduce)"] as
  Record<string, unknown> | undefined;

describe("loadingOverlay styles", () => {
  it("shows the loading card only after 300 ms", () => {
    expect(styles.animation).toBe(
      "mf-fade-in 200ms var(--mf-ease-out) 300ms both"
    );
    expect(reducedMotion?.animation).toBe("mf-fade-in 1ms linear 300ms both");
  });

  it("holds back the animation while the splash is still there", () => {
    expect(styles["&.is-waiting"]).toEqual({ animation: "none", opacity: 0 });
  });
});
