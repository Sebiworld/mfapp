import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { Box } from "@mui/material";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { SplashScreen } from "@core/splashScreen/SplashScreen";
import { footerStyles } from "@core/footer/footer.styles";
import { sidemenuStyles } from "@core/sidemenu/sidemenu.styles";
import { resetMatchMedia, setReducedMotion } from "@src/test/motion";
import { MfLogo } from "../MfLogo";
import { MfLogoVertical } from "../MfLogoVertical";

const PART_SELECTOR = ".logo-m, .logo-f, .logo-bar";

/**
 * Renders children inside the app theme.
 * @param children Elements to render.
 * @returns The container of the render.
 */
const renderThemed = (children: ReactNode): HTMLElement =>
  render(
    <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
      {children}
    </ThemeProvider>
  ).container;

/**
 * Lists the logo parts below an element that match a selector.
 * @param root Element to search in.
 * @param selector Class selector of the parts.
 * @returns The matching SVG elements.
 */
const parts = (root: Element, selector: string): SVGElement[] =>
  Array.from(root.querySelectorAll<SVGElement>(selector));

/**
 * Collects the animation and transform values the styles give the animated logo parts.
 * @param root Element to search in.
 * @returns One `animation-name|transform` entry per part.
 */
const motionOfParts = (root: Element): string[] =>
  parts(root, PART_SELECTOR).map((part) => {
    const style = getComputedStyle(part);
    return `${style.animationName}|${style.transform}`;
  });

describe("MfLogoVertical", () => {
  beforeEach(() => {
    setReducedMotion(false);
  });

  afterEach(() => {
    resetMatchMedia();
  });

  it("names the parts the splash animates", () => {
    const { container } = render(<MfLogoVertical />);

    expect(
      parts(container, ".logo-m").map((p) => p.style.getPropertyValue("--i"))
    ).toEqual(["6", "5", "4", "3", "3", "2", "1", "0"]);
    expect(parts(container, ".logo-m.logo-start")).toHaveLength(8);
    expect(parts(container, ".logo-f.logo-end")).toHaveLength(6);

    const bar = parts(container, ".logo-bar");
    expect(bar).toHaveLength(1);
    expect(bar[0]).toHaveAttribute("y", "291.743");
    expect(bar[0]).toHaveClass("logo-end");
  });

  it("animates the parts inside the splash", () => {
    const container = renderThemed(<SplashScreen visible />);
    const motion = motionOfParts(container.ownerDocument.body);

    expect(motion).toHaveLength(15);

    for (const entry of motion) {
      expect(entry.split("|")[0]).not.toBe("");
    }
  });

  it("moves nothing outside the splash", () => {
    const container = renderThemed(
      <>
        <Box className="footer-logo" sx={footerStyles}>
          <MfLogo layout="vertical" />
        </Box>
        <Box className="sidemenu-logo" sx={sidemenuStyles}>
          <Box className="footer">
            <Box className="logo-container">
              <MfLogo layout="vertical" />
            </Box>
          </Box>
        </Box>
      </>
    );

    const motion = motionOfParts(container);

    expect(motion).toHaveLength(30);

    for (const entry of motion) {
      const [animationName, transform] = entry.split("|");
      expect(["", "none"]).toContain(animationName);
      expect(["", "none"]).toContain(transform);
    }
  });
});
