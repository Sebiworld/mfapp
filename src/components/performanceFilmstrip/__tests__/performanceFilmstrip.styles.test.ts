import { describe, expect, it } from "vitest";
import { mfTheme } from "@styles/theme/mfTheme";
import { performanceFilmstripStyles } from "../performanceFilmstrip.styles";

// Cast: the sx object is only read here as a plain tree of selectors.
const styles = performanceFilmstripStyles(mfTheme) as unknown as Record<
  string,
  Record<string, unknown>
>;

describe("performanceFilmstripStyles", () => {
  it("pauses the band only through its pause class, not through hover or focus", () => {
    const pausing = Object.keys(styles).filter(
      (selector) =>
        (styles[selector] as Record<string, unknown> | undefined)
          ?.animationPlayState === "paused"
    );

    expect(pausing).toEqual(["&.is-paused .filmstrip-track"]);
  });

  it("gives the portraits room above name and role with tiles taller than 3:4", () => {
    const tile = styles[".filmstrip-tile"];
    const small = tile[mfTheme.breakpoints.down("sm")] as Record<
      string,
      unknown
    >;

    expect(tile.width).toBe("112px");
    expect(small.width).toBe("96px");
    expect(styles[".filmstrip-image"].aspectRatio).toBe("2 / 3");
  });
});
