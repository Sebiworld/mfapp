import { RefObject, useCallback, useEffect, useState } from "react";
import { useSplashGone } from "@core/splashScreen/useSplashGone";
import {
  hasPlayed,
  markPlayed,
  MotionScope,
} from "@utils/motion/sessionMotionRegistry";
import { useReducedMotion } from "./useReducedMotion";

/** `static`: final state, nothing moves. `armed`: start state, waiting for the start. `playing`: running once. */
type PlayOncePhase = "static" | "armed" | "playing";

export interface PlayOnceOptions {
  /** Kind of motion; keys of different scopes never block each other. */
  scope: MotionScope;
  /** Key within the scope (e.g. project id); without one the motion never plays. */
  key?: string;
  /** Element whose visibility starts and pauses the motion. */
  targetRef: RefObject<Element | null>;
  /** Further start condition of the caller, e.g. a loaded image. */
  isReady?: boolean;
  /** Share of the target that has to be in view before the start. */
  threshold?: number;
  /** Waits for idle time before the start, so the motion does not compete with loading work. */
  waitForIdle?: boolean;
}

export interface PlayOnceState {
  phase: PlayOncePhase;
  /** `true` while playing with the target off screen or the tab hidden (CSS: `animation-play-state: paused`). */
  isPaused: boolean;
  /** Call when the motion has ended; switches to the final state. */
  onAnimationEnd: () => void;
}

const IDLE_FALLBACK_MS = 200;
const IDLE_TIMEOUT_MS = 1000;

/**
 * Picks the phase a motion starts in.
 * @param scope Kind of motion.
 * @param key Key within the scope.
 * @param isReducedMotion Reduced motion setting.
 * @returns `static` when the motion cannot or must not play, otherwise `armed`.
 */
const getInitialPhase = (
  scope: MotionScope,
  key: string | undefined,
  isReducedMotion: boolean
): PlayOncePhase => {
  // Without an observer nothing would ever start the motion, so the final state shows at once.
  if (
    !key ||
    isReducedMotion ||
    hasPlayed(scope, key) ||
    typeof IntersectionObserver === "undefined"
  ) {
    return "static";
  }

  return "armed";
};

/**
 * Reads the tab visibility.
 * @returns `true` while the tab is visible.
 */
const isTabVisible = (): boolean => document.visibilityState === "visible";

/**
 * Runs a callback in idle time, or after a short delay where the browser has no idle callback.
 * @param callback Function to run.
 * @returns Function that cancels the call.
 */
const scheduleIdle = (callback: () => void): (() => void) => {
  if (typeof window.requestIdleCallback === "function") {
    const handle = window.requestIdleCallback(callback, {
      timeout: IDLE_TIMEOUT_MS,
    });

    return () => window.cancelIdleCallback(handle);
  }

  const handle = window.setTimeout(callback, IDLE_FALLBACK_MS);

  return () => window.clearTimeout(handle);
};

/**
 * Plays a motion once per key and session: after the splash is gone, with the target in view, in a visible tab and
 * once the caller is ready. The key counts as played only when the motion starts, so a mount that never starts
 * (or a StrictMode double effect) does not use it up.
 * @param options Scope, key, target and start conditions, see `PlayOnceOptions`.
 * @returns Current phase, pause flag and the end handler, see `PlayOnceState`.
 */
export const usePlayOncePerSession = ({
  scope,
  key,
  targetRef,
  isReady = true,
  threshold = 0,
  waitForIdle = false,
}: PlayOnceOptions): PlayOnceState => {
  const isReducedMotion = useReducedMotion();
  const isSplashGone = useSplashGone();

  const [phase, setPhase] = useState<PlayOncePhase>(() =>
    getInitialPhase(scope, key, isReducedMotion)
  );
  const [trackedMotion, setTrackedMotion] = useState(`${scope}|${key}`);
  const [isInView, setIsInView] = useState(false);
  const [isPastThreshold, setIsPastThreshold] = useState(false);
  const [isVisible, setIsVisible] = useState(isTabVisible);

  // A new key (e.g. another project in the same component) starts over; its view state is measured afresh.
  if (trackedMotion !== `${scope}|${key}`) {
    setTrackedMotion(`${scope}|${key}`);
    setPhase(getInitialPhase(scope, key, isReducedMotion));
    setIsInView(false);
    setIsPastThreshold(false);
  }

  if (isReducedMotion && phase !== "static") {
    setPhase("static");
  }

  const isActive = phase !== "static";

  useEffect(() => {
    const target = targetRef.current;

    if (!isActive || !target || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target !== target) {
            continue;
          }

          setIsInView(entry.isIntersecting);
          setIsPastThreshold(
            entry.isIntersecting && entry.intersectionRatio >= threshold
          );
        }
      },
      { threshold: threshold > 0 ? [0, threshold] : 0 }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [isActive, targetRef, threshold]);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const onVisibilityChange = (): void => {
      setIsVisible(isTabVisible());
    };

    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [isActive]);

  const canStart =
    phase === "armed" &&
    isReady &&
    isSplashGone &&
    isPastThreshold &&
    isVisible;

  useEffect(() => {
    if (!canStart || !key) {
      return;
    }

    // Marked here and not on mount: StrictMode runs mount effects twice, and an unseen mount must not use the key.
    const start = (): void => {
      markPlayed(scope, key);
      setPhase("playing");
    };

    if (!waitForIdle) {
      start();
      return;
    }

    return scheduleIdle(start);
  }, [canStart, key, scope, waitForIdle]);

  const onAnimationEnd = useCallback((): void => {
    setPhase("static");
  }, []);

  return {
    phase,
    isPaused: phase === "playing" && (!isInView || !isVisible),
    onAnimationEnd,
  };
};
