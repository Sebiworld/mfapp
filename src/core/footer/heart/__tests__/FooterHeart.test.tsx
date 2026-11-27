import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, render } from "@testing-library/react";
import { resetMatchMedia, setReducedMotion } from "@src/test/motion";
import { HEART_BURST_COUNT, HEART_BURST_LOCK_MS } from "../heartBurst";
import { FooterHeart } from "../FooterHeart";

vi.mock("../HeartAnimation", () => ({
  HeartAnimation: () => <span data-testid="heart-animation" />,
}));

interface StubAnimation {
  onfinish: (() => void) | null;
  oncancel: (() => void) | null;
}

describe("FooterHeart", () => {
  let animations: StubAnimation[];
  let animate: ReturnType<typeof vi.fn>;
  const originalAnimate = HTMLElement.prototype.animate;

  /**
   * Renders the heart and returns its pointer target.
   * @returns The heart element.
   */
  const renderHeart = (): HTMLElement => {
    const { container } = render(<FooterHeart />);

    return container.querySelector<HTMLElement>(".heart-button")!;
  };

  beforeEach(() => {
    animations = [];
    animate = vi.fn(() => {
      const animation: StubAnimation = { onfinish: null, oncancel: null };
      animations.push(animation);

      return animation;
    });
    // Cast: the stub returns only the handlers the burst sets.
    HTMLElement.prototype.animate =
      animate as unknown as HTMLElement["animate"];
  });

  afterEach(() => {
    HTMLElement.prototype.animate = originalAnimate;
    vi.useRealTimers();
    resetMatchMedia();
  });

  it("is a pointer-only easter egg hidden from assistive technology", () => {
    setReducedMotion(false);
    const heart = renderHeart();

    expect(heart).toHaveAttribute("aria-hidden", "true");
    expect(heart).not.toHaveAttribute("tabindex");
  });

  it("lets brand hearts rise on release", () => {
    setReducedMotion(false);
    const heart = renderHeart();

    fireEvent.pointerDown(heart);

    expect(heart).toHaveClass("is-pressed");

    fireEvent.pointerUp(heart);

    expect(heart).not.toHaveClass("is-pressed");
    expect(animate).toHaveBeenCalledTimes(HEART_BURST_COUNT);
    expect(HEART_BURST_COUNT).toBe(9);
    expect(heart.querySelectorAll(".heart-particle")).toHaveLength(9);

    for (const animation of animations) {
      animation.onfinish?.();
    }

    expect(heart.querySelectorAll(".heart-particle")).toHaveLength(0);
  });

  it("waits until the hearts have flown", () => {
    vi.useFakeTimers();
    setReducedMotion(false);
    const heart = renderHeart();

    fireEvent.pointerUp(heart);
    fireEvent.pointerUp(heart);

    expect(animate).toHaveBeenCalledTimes(HEART_BURST_COUNT);

    act(() => {
      vi.advanceTimersByTime(HEART_BURST_LOCK_MS);
    });
    fireEvent.pointerUp(heart);

    expect(animate).toHaveBeenCalledTimes(2 * HEART_BURST_COUNT);
  });

  it("neither squeezes nor bursts with reduced motion", () => {
    setReducedMotion(true);
    const heart = renderHeart();

    fireEvent.pointerDown(heart);

    expect(heart).not.toHaveClass("is-pressed");

    fireEvent.pointerUp(heart);

    expect(animate).not.toHaveBeenCalled();
    expect(heart.querySelectorAll(".heart-particle")).toHaveLength(0);
  });
});
