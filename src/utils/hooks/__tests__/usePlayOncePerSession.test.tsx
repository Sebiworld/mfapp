import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { StrictMode } from "react";
import type { MotionScope } from "@utils/motion/sessionMotionRegistry";
import {
  resetMatchMedia,
  setReducedMotion,
  stubIntersectionObserver,
} from "@src/test/motion";
import type { PlayOnceOptions } from "../usePlayOncePerSession";

// Loaded fresh for every test: the splash signal and the played motions live in module state.
let markSplashGone: () => void;
let hasPlayed: (scope: MotionScope, key: string) => boolean;
let markPlayed: (scope: MotionScope, key: string) => void;
let usePlayOncePerSession: typeof import("../usePlayOncePerSession").usePlayOncePerSession;

/**
 * Builds hook options around a detached target element.
 * @param overrides Options that differ from the defaults of a test.
 * @returns Options for the hook.
 */
const options = (
  overrides: Partial<PlayOnceOptions> = {}
): PlayOnceOptions => ({
  scope: "project-header",
  key: "3",
  targetRef: { current: document.createElement("div") },
  ...overrides,
});

describe("usePlayOncePerSession", () => {
  beforeEach(async () => {
    vi.resetModules();
    ({ markSplashGone } = await import("@core/splashScreen/splashSignal"));
    ({ hasPlayed, markPlayed } = await import(
      "@utils/motion/sessionMotionRegistry"
    ));
    ({ usePlayOncePerSession } = await import("../usePlayOncePerSession"));
    setReducedMotion(false);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    resetMatchMedia();
  });

  it("shows the final state without IntersectionObserver", () => {
    vi.stubGlobal("IntersectionObserver", undefined);
    markSplashGone();

    const { result } = renderHook(() => usePlayOncePerSession(options()));

    expect(result.current.phase).toBe("static");
    expect(hasPlayed("project-header", "3")).toBe(false);
  });

  it("stays static without key and once played", () => {
    stubIntersectionObserver();
    markPlayed("project-header", "3");

    const withoutKey = renderHook(() =>
      usePlayOncePerSession(options({ key: undefined }))
    );
    const played = renderHook(() => usePlayOncePerSession(options()));
    const other = renderHook(() =>
      usePlayOncePerSession(options({ key: "4" }))
    );

    expect(withoutKey.result.current.phase).toBe("static");
    expect(played.result.current.phase).toBe("static");
    expect(other.result.current.phase).toBe("armed");
  });

  it("stays static with reduced motion", () => {
    stubIntersectionObserver();
    setReducedMotion(true);

    const { result } = renderHook(() => usePlayOncePerSession(options()));

    expect(result.current.phase).toBe("static");
  });

  it("marks the key only when the animation starts", () => {
    const observer = stubIntersectionObserver();
    const { result } = renderHook(() => usePlayOncePerSession(options()));

    expect(result.current.phase).toBe("armed");

    act(() => markSplashGone());

    expect(result.current.phase).toBe("armed");
    expect(hasPlayed("project-header", "3")).toBe(false);

    act(() => observer.report(true));

    expect(result.current.phase).toBe("playing");
    expect(hasPlayed("project-header", "3")).toBe(true);
  });

  it("waits for the splash to be gone", () => {
    const observer = stubIntersectionObserver();
    const { result } = renderHook(() => usePlayOncePerSession(options()));

    act(() => observer.report(true));

    expect(result.current.phase).toBe("armed");

    act(() => markSplashGone());

    expect(result.current.phase).toBe("playing");
  });

  it("waits for the target to be ready", () => {
    const observer = stubIntersectionObserver();
    markSplashGone();
    const { result, rerender } = renderHook(
      ({ isReady }) => usePlayOncePerSession(options({ isReady })),
      { initialProps: { isReady: false } }
    );

    act(() => observer.report(true));

    expect(result.current.phase).toBe("armed");

    rerender({ isReady: true });

    expect(result.current.phase).toBe("playing");
  });

  it("plays under StrictMode", () => {
    const observer = stubIntersectionObserver();
    const { result } = renderHook(() => usePlayOncePerSession(options()), {
      wrapper: StrictMode,
    });

    expect(result.current.phase).toBe("armed");

    act(() => markSplashGone());
    act(() => observer.report(true));

    expect(result.current.phase).toBe("playing");
  });

  it("plays under StrictMode when it waits for idle time", () => {
    vi.useFakeTimers();
    vi.stubGlobal("requestIdleCallback", undefined);

    try {
      const observer = stubIntersectionObserver();
      markSplashGone();
      const { result } = renderHook(
        () => usePlayOncePerSession(options({ waitForIdle: true })),
        { wrapper: StrictMode }
      );

      act(() => observer.report(true));

      expect(result.current.phase).toBe("armed");
      expect(hasPlayed("project-header", "3")).toBe(false);

      act(() => vi.advanceTimersByTime(200));

      expect(result.current.phase).toBe("playing");
      expect(hasPlayed("project-header", "3")).toBe(true);
    } finally {
      vi.useRealTimers();
    }
  });

  it("waits for a visible tab", () => {
    const visibility = vi
      .spyOn(document, "visibilityState", "get")
      .mockReturnValue("hidden");
    const observer = stubIntersectionObserver();
    markSplashGone();
    const { result } = renderHook(() => usePlayOncePerSession(options()));

    act(() => observer.report(true));

    expect(result.current.phase).toBe("armed");

    visibility.mockReturnValue("visible");
    act(() => {
      document.dispatchEvent(new Event("visibilitychange"));
    });

    expect(result.current.phase).toBe("playing");
  });

  it("pauses while the target is off screen", () => {
    const observer = stubIntersectionObserver();
    markSplashGone();
    const { result } = renderHook(() => usePlayOncePerSession(options()));

    act(() => observer.report(true));

    expect(result.current.phase).toBe("playing");
    expect(result.current.isPaused).toBe(false);

    act(() => observer.report(false));

    expect(result.current.phase).toBe("playing");
    expect(result.current.isPaused).toBe(true);

    act(() => observer.report(true));

    expect(result.current.isPaused).toBe(false);
  });

  it("ends in the final state", () => {
    const observer = stubIntersectionObserver();
    markSplashGone();
    const { result } = renderHook(() => usePlayOncePerSession(options()));

    act(() => observer.report(true));
    act(() => result.current.onAnimationEnd());

    expect(result.current.phase).toBe("static");
  });

  it("arms again for a key that has not played yet", () => {
    const observer = stubIntersectionObserver();
    markSplashGone();
    const { result, rerender } = renderHook(
      ({ key }) => usePlayOncePerSession(options({ key })),
      { initialProps: { key: "3" } }
    );

    act(() => observer.report(true));
    act(() => result.current.onAnimationEnd());

    expect(result.current.phase).toBe("static");

    rerender({ key: "4" });

    expect(result.current.phase).toBe("armed");

    act(() => observer.report(true));

    expect(result.current.phase).toBe("playing");
    expect(hasPlayed("project-header", "4")).toBe(true);

    rerender({ key: "3" });

    expect(result.current.phase).toBe("static");
  });
});
