import { afterEach, describe, expect, it, vi } from "vitest";
import { removeViewTransitionStub, stubViewTransition } from "@src/test/motion";
import { startColorModeTransition } from "../startColorModeTransition";

const html = document.documentElement;

/** Waits until the stubbed update callback and the `ready` handlers have run. */
const settle = (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 0));

describe("startColorModeTransition", () => {
  afterEach(() => {
    removeViewTransitionStub();
    html.className = "";
  });

  it("applies at once without the API", () => {
    const apply = vi.fn();

    startColorModeTransition(apply, { x: 10, y: 20 }, false);

    expect(apply).toHaveBeenCalledTimes(1);
    expect(html.className).toBe("");
  });

  it("applies the change inside the transition", async () => {
    const transition = stubViewTransition();
    const apply = vi.fn(() => html.classList.add("theme-dark"));

    startColorModeTransition(apply, { x: 10, y: 20 }, false);

    expect(apply).not.toHaveBeenCalled();
    await settle();
    expect(apply).toHaveBeenCalledTimes(1);
    expect(transition.htmlClassesAfterUpdate[0]).toContain("theme-dark");
  });

  it("grows a circle from the button", async () => {
    const transition = stubViewTransition();
    const end = Math.hypot(
      Math.max(10, window.innerWidth - 10),
      Math.max(20, window.innerHeight - 20)
    );

    startColorModeTransition(() => undefined, { x: 10, y: 20 }, false);

    expect(html).toHaveClass("vt-circle");
    await settle();
    expect(transition.animate).toHaveBeenCalledTimes(1);
    expect(transition.animate).toHaveBeenCalledWith(
      {
        clipPath: ["circle(0px at 10px 20px)", `circle(${end}px at 10px 20px)`],
      },
      {
        duration: 450,
        easing: "cubic-bezier(0.23, 1, 0.32, 1)",
        pseudoElement: "::view-transition-new(root)",
      }
    );

    await transition.finish();
    expect(html).not.toHaveClass("vt-circle");
  });

  it("only fades with reduced motion", async () => {
    const transition = stubViewTransition();

    startColorModeTransition(() => undefined, { x: 10, y: 20 }, true);

    expect(html).toHaveClass("vt-fade");
    expect(html).not.toHaveClass("vt-circle");
    await settle();
    expect(transition.start).toHaveBeenCalledTimes(1);
    expect(transition.animate).not.toHaveBeenCalled();

    await transition.finish();
    expect(html).not.toHaveClass("vt-fade");
  });

  it("draws nothing when the browser skips the transition", async () => {
    const transition = stubViewTransition(true);
    const apply = vi.fn();

    startColorModeTransition(apply, { x: 10, y: 20 }, false);
    await settle();

    expect(apply).toHaveBeenCalledTimes(1);
    expect(transition.animate).not.toHaveBeenCalled();

    await transition.finish();
    expect(html).not.toHaveClass("vt-circle");
  });

  it("keeps the class while a newer transition runs", async () => {
    const transition = stubViewTransition();

    startColorModeTransition(() => undefined, { x: 10, y: 20 }, false);
    await settle();
    startColorModeTransition(() => undefined, { x: 10, y: 20 }, false);
    await settle();

    // A new transition ends the running one in the browser; the new one still needs the class.
    await transition.finish(0);
    expect(html).toHaveClass("vt-circle");

    await transition.finish(1);
    expect(html).not.toHaveClass("vt-circle");
  });
});
