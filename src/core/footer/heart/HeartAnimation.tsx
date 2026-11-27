import heartAnimation from "@assets/lotties/heart.json";
import { useLottie } from "lottie-react";
import { useEffect, useMemo } from "react";
import { useReducedMotion } from "@utils/hooks/useReducedMotion";
import { heartAnimationStyles } from "./heart.styles";

/**
 * Frame shown with reduced motion: the red heart is fully grown from frame 32 on, its sparks are gone by about
 * frame 34, and from frame 50 it fades back to grey until the end (75).
 */
export const HEART_STILL_FRAME = 40;

/**
 * Looping heart animation; lives in its own module so the lottie runtime stays out of the main chunk.
 * With reduced motion the heart stands still on a full frame instead of looping.
 * @returns The lottie view.
 */
export const HeartAnimation: React.FC = () => {
  const isReducedMotion = useReducedMotion();

  const heartAnimationOptions = useMemo(
    () => ({
      loop: !isReducedMotion,
      autoplay: !isReducedMotion,
      animationData: heartAnimation,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
      key: "heartAnimation",
    }),
    [isReducedMotion]
  );

  const { View, goToAndStop, animationLoaded } = useLottie(
    heartAnimationOptions,
    heartAnimationStyles
  );

  useEffect(() => {
    if (!isReducedMotion || !animationLoaded) {
      return;
    }

    goToAndStop(HEART_STILL_FRAME, true);
  }, [animationLoaded, goToAndStop, isReducedMotion]);

  return View;
};
