import { useEffect, useState } from "react";

/** Number of loading messages in `de.json` (`splash.1` … `splash.22`). */
export const SPLASH_MESSAGE_COUNT = 22;

/** Time each loading message stays. */
export const SPLASH_MESSAGE_INTERVAL_MS = 5000;

/** Time the previous message needs to fade out; it is dropped afterwards. */
export const SPLASH_MESSAGE_LEAVE_MS = 170;

interface SplashMessageState {
  current: number;
  previous: number | null;
}

/**
 * Rotates through the loading messages, keeping the previous one briefly so both can cross-fade.
 * @param isRotating `false` stops the rotation and keeps the current message.
 * @returns `current` is the number of the message to show (1-based), `previous` the one fading out, if any.
 */
export const useSplashMessage = (isRotating: boolean): SplashMessageState => {
  const [state, setState] = useState<SplashMessageState>({
    current: 1,
    previous: null,
  });

  useEffect(() => {
    if (!isRotating) {
      return;
    }

    let leaveTimer: ReturnType<typeof setTimeout> | undefined;

    const interval = setInterval(() => {
      setState(({ current }) => ({
        current: current >= SPLASH_MESSAGE_COUNT ? 1 : current + 1,
        previous: current,
      }));

      clearTimeout(leaveTimer);
      leaveTimer = setTimeout(() => {
        setState((prev) => ({ ...prev, previous: null }));
      }, SPLASH_MESSAGE_LEAVE_MS);
    }, SPLASH_MESSAGE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(leaveTimer);

      // A stop during the cross-fade would otherwise keep the old message for good.
      setState((prev) =>
        prev.previous === null ? prev : { ...prev, previous: null }
      );
    };
  }, [isRotating]);

  return state;
};
