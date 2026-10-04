import heartAnimation from "@assets/lotties/heart.json";
import { useLottie } from "lottie-react";
import { heartAnimationStyles } from "./heart.styles";

const heartAnimationOptions = {
  loop: true,
  autoplay: true,
  animationData: heartAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
  key: "heartAnimation",
};

/** Looping heart animation; lives in its own module so the lottie runtime stays out of the main chunk. */
export const HeartAnimation: React.FC = () => {
  const { View } = useLottie(heartAnimationOptions, heartAnimationStyles);

  return View;
};
