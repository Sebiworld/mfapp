import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import indexHtml from "../../../../index.html?raw";
import { removeBootSplash } from "../bootSplash";

const LATE_AFTER_MS = 15000;

/**
 * Builds the page as the browser receives it: the splash markup in the body, then the inline script of the head.
 * @returns The splash element.
 */
const loadStaticSplash = (): HTMLElement => {
  const parsed = new DOMParser().parseFromString(indexHtml, "text/html");
  const script = parsed.getElementById("mf-boot-script")?.textContent ?? "";
  const splash = parsed.getElementById("mf-boot-splash");

  if (!script || !splash) {
    throw new Error("index.html has no early splash script or markup");
  }

  document.body.replaceChildren(document.importNode(splash, true));
  // Runs the head script of the page; it only reads storage and sets the timer.
  new Function(script)();

  return document.getElementById("mf-boot-splash") as HTMLElement;
};

describe("static splash when loading takes long", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    removeBootSplash();
    document.body.replaceChildren();
    vi.useRealTimers();
  });

  it("shows the hint and a reload button only after 15 s", () => {
    const splash = loadStaticSplash();
    const late = splash.querySelector<HTMLElement>(".boot-late")!;

    expect(late.textContent).toContain("Das Laden dauert ungewöhnlich lange.");
    expect(late.querySelector("button")?.textContent).toBe("Neu laden");
    expect(splash).not.toHaveClass("is-late");
    expect(splash).toHaveAttribute("aria-hidden", "true");

    vi.advanceTimersByTime(LATE_AFTER_MS - 1);

    expect(splash).not.toHaveClass("is-late");

    vi.advanceTimersByTime(1);

    expect(splash).toHaveClass("is-late");
    // Hidden from assistive technology before; the button has to be reachable now.
    expect(splash).not.toHaveAttribute("aria-hidden");
  });

  it("reloads the page from the button", () => {
    const reload = vi.fn();
    const splash = loadStaticSplash();
    const handler = splash
      .querySelector(".boot-late button")!
      .getAttribute("onclick")!;

    // jsdom runs inline handlers in its own realm, where the location cannot be replaced; run the code with a stub.
    new Function("window", handler)({ location: { reload } });

    expect(handler).toBe("window.location.reload()");
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("stops the timer when the splash is removed", () => {
    const clear = vi.spyOn(globalThis, "clearTimeout");
    const splash = loadStaticSplash();
    const timer = window.__mfBootSlowTimer;

    expect(timer).toBeDefined();

    removeBootSplash();

    expect(clear).toHaveBeenCalledWith(timer);

    // A splash that is back (a second one in the page) must not be touched by the stopped timer.
    document.body.appendChild(splash);
    vi.advanceTimersByTime(LATE_AFTER_MS);

    expect(splash).not.toHaveClass("is-late");
  });

  it("shows the hint without a fade with reduced motion", () => {
    const style = new DOMParser()
      .parseFromString(indexHtml, "text/html")
      .getElementById("mf-boot-style")?.textContent;
    const reduced = style?.slice(
      style.indexOf("@media (prefers-reduced-motion:reduce)")
    );

    expect(style).toMatch(
      /#mf-boot-splash\.is-late \.boot-late\{display:flex;animation:mf-bf/
    );
    expect(reduced).toMatch(/#mf-boot-splash\.is-late \.boot-late\{animation:none/);
  });
});
