import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

// Loaded fresh for every test: the signal lives in module state.
let isSplashGone: () => boolean;
let markSplashGone: () => void;
let subscribeSplashGone: (listener: () => void) => () => void;
let useSplashGone: () => boolean;

describe("splash signal", () => {
  beforeEach(async () => {
    vi.resetModules();
    ({ isSplashGone, markSplashGone, subscribeSplashGone } = await import(
      "../splashSignal"
    ));
    ({ useSplashGone } = await import("../useSplashGone"));
  });

  it("tells subscribers once the splash is gone", () => {
    const { result } = renderHook(() => useSplashGone());

    expect(result.current).toBe(false);

    act(() => markSplashGone());

    expect(result.current).toBe(true);
    expect(isSplashGone()).toBe(true);
  });

  it("notifies a listener only once and not after unsubscribing", () => {
    const listener = vi.fn();
    const late = vi.fn();
    subscribeSplashGone(listener);
    const unsubscribe = subscribeSplashGone(late);
    unsubscribe();

    markSplashGone();
    markSplashGone();

    expect(listener).toHaveBeenCalledTimes(1);
    expect(late).not.toHaveBeenCalled();
  });

  it("reports a splash that is already gone on the first render", () => {
    markSplashGone();

    const { result } = renderHook(() => useSplashGone());

    expect(result.current).toBe(true);
  });
});
