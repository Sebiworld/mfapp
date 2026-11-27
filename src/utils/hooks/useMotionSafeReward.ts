import { useCallback } from "react";
import { useReward } from "react-rewards";
import { useReducedMotion } from "./useReducedMotion";

type RewardType = "confetti" | "balloons" | "emoji";

interface MotionSafeReward {
  reward: () => void;
  isAnimating: boolean;
}

/**
 * `useReward` that throws no particles while the user asks for reduced motion; the caller's own success text or
 * toast stays the feedback.
 * @param id Id of the element the particles start from.
 * @param type Kind of particles.
 * @param config Options passed on to `useReward`.
 * @returns `reward` starts the particles (does nothing with reduced motion); `isAnimating` is `true` while they fly.
 */
export const useMotionSafeReward = <T extends RewardType>(
  id: string,
  type: T,
  config?: Parameters<typeof useReward<T>>[2]
): MotionSafeReward => {
  const isReducedMotion = useReducedMotion();
  const { reward, isAnimating } = useReward(id, type, config);

  const safeReward = useCallback(() => {
    if (isReducedMotion) {
      return;
    }

    reward();
  }, [isReducedMotion, reward]);

  return { reward: safeReward, isAnimating };
};
