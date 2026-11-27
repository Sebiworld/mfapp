import { useSyncExternalStore } from "react";
import { isSplashGone, subscribeSplashGone } from "./splashSignal";

/**
 * Follows the splash signal in a component.
 * @returns `true` once the splash screen is gone.
 */
export const useSplashGone = (): boolean =>
  useSyncExternalStore(subscribeSplashGone, isSplashGone, isSplashGone);
