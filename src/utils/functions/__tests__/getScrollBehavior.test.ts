import { afterEach, describe, expect, it } from "vitest";
import { resetMatchMedia, setReducedMotion } from "@src/test/motion";
import { getScrollBehavior } from "../getScrollBehavior";

describe("getScrollBehavior", () => {
  afterEach(() => {
    resetMatchMedia();
  });

  it("scrolls smoothly by default and jumps with reduced motion", () => {
    setReducedMotion(false);
    expect(getScrollBehavior()).toBe("smooth");

    setReducedMotion(true);
    expect(getScrollBehavior()).toBe("auto");
  });

  it("scrolls smoothly without matchMedia", () => {
    resetMatchMedia();

    expect(getScrollBehavior()).toBe("smooth");
  });
});
