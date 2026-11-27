import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";
import { resetMatchMedia, setReducedMotion } from "@src/test/motion";
import { HEART_STILL_FRAME, HeartAnimation } from "../HeartAnimation";

const lottie = vi.hoisted(() => ({
  options: undefined as Record<string, unknown> | undefined,
  goToAndStop: vi.fn(),
}));

vi.mock("lottie-react", () => ({
  useLottie: (options: Record<string, unknown>) => {
    lottie.options = options;

    return {
      View: <i data-testid="heart" />,
      goToAndStop: lottie.goToAndStop,
      animationLoaded: true,
    };
  },
}));

describe("HeartAnimation", () => {
  beforeEach(() => {
    lottie.options = undefined;
    lottie.goToAndStop.mockReset();
  });

  afterEach(() => {
    resetMatchMedia();
  });

  it("loops the heart by default", () => {
    setReducedMotion(false);

    render(<HeartAnimation />);

    expect(lottie.options).toMatchObject({ loop: true, autoplay: true });
    expect(lottie.goToAndStop).not.toHaveBeenCalled();
  });

  it("holds a still frame with reduced motion", () => {
    setReducedMotion(true);

    render(<HeartAnimation />);

    expect(lottie.options).toMatchObject({ loop: false, autoplay: false });
    expect(lottie.goToAndStop).toHaveBeenCalledWith(HEART_STILL_FRAME, true);
  });

  it("holds a frame that shows the full red heart", () => {
    // The red heart is fully grown from frame 32 on and turns grey again from frame 50 on.
    expect(HEART_STILL_FRAME).toBeGreaterThanOrEqual(32);
    expect(HEART_STILL_FRAME).toBeLessThanOrEqual(50);
  });
});
