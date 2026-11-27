import { useEffect, useState, useSyncExternalStore } from "react";
import { isContentPending, subscribeContentPending } from "./splashSignal";

/** Longest wait for the first page content after the app is ready; then the splash leaves anyway. */
export const SPLASH_CONTENT_WAIT_MS = 2000;

/**
 * Keeps the splash up until the app is ready and the first content of the current route is there, but at most
 * `SPLASH_CONTENT_WAIT_MS` after the app is ready. Once released it stays released: later loads (navigation) do
 * not bring the splash back.
 * @param isReady `true` once the app is initialised.
 * @returns `true` while the splash has to stay.
 */
export const useSplashHold = (isReady: boolean): boolean => {
  const isPending = useSyncExternalStore(
    subscribeContentPending,
    isContentPending,
    isContentPending
  );
  const [isReleased, setIsReleased] = useState(false);
  const [isWaitOver, setIsWaitOver] = useState(false);

  useEffect(() => {
    if (!isReady || isReleased) {
      return;
    }

    const timer = setTimeout(() => {
      setIsWaitOver(true);
    }, SPLASH_CONTENT_WAIT_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [isReady, isReleased]);

  if (isReady && !isReleased && (!isPending || isWaitOver)) {
    setIsReleased(true);
  }

  return !isReleased;
};
