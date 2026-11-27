import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { StrictMode } from "react";
import { THEME_ID, ThemeProvider } from "@mui/material/styles";
import { mfTheme } from "@styles/theme/mfTheme";
import { resetMatchMedia, setReducedMotion } from "@src/test/motion";
import * as de from "@src/assets/i18n/de.json";
import { MfLogoVertical } from "@components/mfLogo/MfLogoVertical";
import indexHtml from "../../../../index.html?raw";
import {
  BOOT_SPLASH_ID,
  getBootSplashElapsedMs,
  removeBootSplash,
} from "../bootSplash";
import { SplashScreen } from "../SplashScreen";

const THEME_CLASSES = ["theme-light", "theme-dark"];

/**
 * Parses the app's `index.html` as the browser receives it.
 * @returns The parsed document.
 */
const parseIndexHtml = (): Document =>
  new DOMParser().parseFromString(indexHtml, "text/html");

/**
 * Finds the early splash in the parsed `index.html`.
 * @returns The early splash element.
 */
const bootSplash = (): Element => {
  const element = parseIndexHtml().getElementById(BOOT_SPLASH_ID);

  if (!element) {
    throw new Error("index.html has no early splash");
  }

  return element;
};

/**
 * Describes every shape of an SVG with the attributes that decide how it is drawn and animated.
 * @param svg SVG to describe.
 * @returns One entry per shape, in document order.
 */
const shapesOf = (svg: Element | null): string[] =>
  Array.from(svg?.querySelectorAll("path, rect") ?? []).map((shape) =>
    [
      shape.tagName.toLowerCase(),
      shape.getAttribute("d") ?? "",
      shape.getAttribute("x") ?? "",
      shape.getAttribute("y") ?? "",
      shape.getAttribute("width") ?? "",
      shape.getAttribute("height") ?? "",
      shape.getAttribute("fill-rule") ?? "",
      shape.getAttribute("class") ?? "",
      // React writes `--i: 6;`, the static markup `--i:6`; both mean the same.
      (shape.getAttribute("style") ?? "").replace(/[\s;]/g, ""),
    ].join("|")
  );

/**
 * Runs the inline script of `index.html` the way the browser does before the bundle.
 */
const runBootScript = (): void => {
  const script = parseIndexHtml().getElementById("mf-boot-script");

  if (!script?.textContent) {
    throw new Error("index.html has no boot script");
  }

  // Executes the inline script text as the browser would; there is no module to import.
  new Function(script.textContent)();
};

/**
 * Installs a `window.matchMedia` that answers the colour scheme query (jsdom has none).
 * @param isDark `true` makes `(prefers-color-scheme: dark)` match.
 */
const setSystemDark = (isDark: boolean): void => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      matches: isDark && query.includes("prefers-color-scheme: dark"),
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
};

/**
 * Puts an early splash into the live document, as `index.html` does.
 */
const mountBootSplash = (): void => {
  const element = document.createElement("div");
  element.id = BOOT_SPLASH_ID;
  document.body.appendChild(element);
};

describe("early splash in index.html", () => {
  beforeEach(() => {
    document.documentElement.classList.remove(...THEME_CLASSES);
  });

  afterEach(() => {
    document.documentElement.classList.remove(...THEME_CLASSES);
    document.getElementById(BOOT_SPLASH_ID)?.remove();
    delete window.__mfBootSplashStart;
    resetMatchMedia();
  });

  it("draws the same logo as the React splash", () => {
    const { container } = render(<MfLogoVertical />);
    const rendered = shapesOf(container.querySelector("svg"));

    expect(rendered).toHaveLength(15);
    expect(shapesOf(bootSplash().querySelector("svg"))).toEqual(rendered);
  });

  it("shows the first loading message in German", () => {
    expect(bootSplash().querySelector("[data-boot-message]")?.textContent).toBe(
      de.splash["1"]
    );
  });

  it("sits before the app root and is hidden from assistive technology", () => {
    const parsed = parseIndexHtml();
    const boot = parsed.getElementById(BOOT_SPLASH_ID);
    const root = parsed.getElementById("root");

    // The parsed document is not the test document, so jest-dom matchers do not accept its elements.
    expect(boot?.getAttribute("aria-hidden")).toBe("true");
    expect(boot?.parentElement).toBe(parsed.body);
    expect(root).not.toBeNull();
    expect(
      boot && root
        ? boot.compareDocumentPosition(root) & Node.DOCUMENT_POSITION_FOLLOWING
        : 0
    ).toBeTruthy();
  });

  it.each([
    [null, false, "theme-light"],
    ["light", true, "theme-light"],
    ["dark", false, "theme-dark"],
    ["system", true, "theme-dark"],
    ["system", false, "theme-light"],
  ])(
    "picks the colour scheme before the bundle (mode %s, system dark %s)",
    (mode, isSystemDark, expected) => {
      if (mode !== null) {
        localStorage.setItem("mui-mode", mode);
      }

      setSystemDark(isSystemDark);
      runBootScript();

      expect(document.documentElement).toHaveClass(expected);
      expect(document.documentElement.classList).toHaveLength(1);
    }
  );

  it("falls back to light when storage throws", () => {
    setSystemDark(true);
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("storage blocked");
    });

    runBootScript();

    expect(document.documentElement).toHaveClass("theme-light");
  });

  it("records when the early splash started", () => {
    vi.spyOn(performance, "now").mockReturnValue(123);
    setSystemDark(false);

    runBootScript();

    expect(window.__mfBootSplashStart).toBe(123);
  });

  it("reports how long the early splash has run", () => {
    expect(getBootSplashElapsedMs()).toBe(0);

    mountBootSplash();
    expect(getBootSplashElapsedMs()).toBe(0);

    window.__mfBootSplashStart = 100;
    vi.spyOn(performance, "now").mockReturnValue(400);

    expect(getBootSplashElapsedMs()).toBe(300);
  });

  it("removes the early splash once and tolerates repeated calls", () => {
    mountBootSplash();

    removeBootSplash();
    removeBootSplash();

    expect(document.getElementById(BOOT_SPLASH_ID)).toBeNull();
  });

  it("continues the early splash without a second entrance and removes it", () => {
    setReducedMotion(false);
    mountBootSplash();
    window.__mfBootSplashStart = 100;
    vi.spyOn(performance, "now").mockReturnValue(400);

    render(
      <StrictMode>
        <ThemeProvider
          theme={{ [THEME_ID]: mfTheme }}
          noSsr
          defaultMode="light"
        >
          <SplashScreen visible />
        </ThemeProvider>
      </StrictMode>
    );

    expect(
      screen
        .getByTestId("splash-screen")
        .style.getPropertyValue("--mf-splash-elapsed")
    ).toBe("300ms");
    expect(document.getElementById(BOOT_SPLASH_ID)).toBeNull();
  });

  it("plays the full entrance of a splash that only shows later", () => {
    setReducedMotion(false);
    mountBootSplash();
    window.__mfBootSplashStart = 100;
    vi.spyOn(performance, "now").mockReturnValue(400);

    const { rerender } = render(
      <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
        <SplashScreen visible={false} variant="maintenance" />
      </ThemeProvider>
    );

    rerender(
      <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
        <SplashScreen visible variant="maintenance" />
      </ThemeProvider>
    );

    expect(
      screen
        .getByTestId("splash-screen")
        .style.getPropertyValue("--mf-splash-elapsed")
    ).toBe("0ms");
  });

  it("removes the early splash even when the splash never shows", () => {
    setReducedMotion(false);
    mountBootSplash();

    render(
      <ThemeProvider theme={{ [THEME_ID]: mfTheme }} noSsr defaultMode="light">
        <SplashScreen visible={false} />
      </ThemeProvider>
    );

    expect(screen.queryByTestId("splash-screen")).toBeNull();
    expect(document.getElementById(BOOT_SPLASH_ID)).toBeNull();
  });
});
