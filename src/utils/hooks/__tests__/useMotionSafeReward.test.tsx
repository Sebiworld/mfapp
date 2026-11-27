import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { resetMatchMedia, setReducedMotion } from "@src/test/motion";
import { useMotionSafeReward } from "../useMotionSafeReward";

const rewardSpy = vi.hoisted(() => vi.fn());
const useRewardSpy = vi.hoisted(() => vi.fn());

vi.mock("react-rewards", () => ({
  useReward: (...args: unknown[]) => {
    useRewardSpy(...args);

    return { reward: rewardSpy, isAnimating: false };
  },
}));

describe("useMotionSafeReward", () => {
  beforeEach(() => {
    rewardSpy.mockReset();
    useRewardSpy.mockReset();
  });

  afterEach(() => {
    resetMatchMedia();
  });

  it("fires the reward normally and skips it with reduced motion", () => {
    setReducedMotion(false);
    const normal = renderHook(() =>
      useMotionSafeReward("reward-id", "balloons", { position: "absolute" })
    );

    normal.result.current.reward();

    expect(rewardSpy).toHaveBeenCalledTimes(1);
    expect(useRewardSpy).toHaveBeenCalledWith("reward-id", "balloons", {
      position: "absolute",
    });
    normal.unmount();

    rewardSpy.mockReset();
    setReducedMotion(true);
    const reduced = renderHook(() =>
      useMotionSafeReward("reward-id", "balloons")
    );

    reduced.result.current.reward();

    expect(rewardSpy).not.toHaveBeenCalled();
    expect(reduced.result.current.isAnimating).toBe(false);
  });
});
