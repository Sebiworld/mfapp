import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";

let registerContentPending: () => () => void;
let useSplashHold: (isReady: boolean) => boolean;
let SPLASH_CONTENT_WAIT_MS: number;

// Loaded fresh for every test: the pending count lives in module state.
describe("useSplashHold", () => {
  beforeEach(async () => {
    vi.useFakeTimers();
    vi.resetModules();
    ({ registerContentPending } = await import("../splashSignal"));
    ({ useSplashHold, SPLASH_CONTENT_WAIT_MS } =
      await import("../useSplashHold"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("holds until the app is ready, even without pending content", () => {
    const { result, rerender } = renderHook(
      ({ ready }) => useSplashHold(ready),
      { initialProps: { ready: false } }
    );

    expect(result.current).toBe(true);

    rerender({ ready: true });

    expect(result.current).toBe(false);
  });

  it("holds while first content is pending and releases when it arrives", () => {
    const end = registerContentPending();
    const { result } = renderHook(() => useSplashHold(true));

    expect(result.current).toBe(true);

    act(() => end());

    expect(result.current).toBe(false);
  });

  it("releases after the longest wait when content stays pending", () => {
    registerContentPending();
    const { result } = renderHook(() => useSplashHold(true));

    act(() => vi.advanceTimersByTime(SPLASH_CONTENT_WAIT_MS - 1));
    expect(result.current).toBe(true);

    act(() => vi.advanceTimersByTime(1));
    expect(result.current).toBe(false);
    expect(SPLASH_CONTENT_WAIT_MS).toBe(2000);
  });

  it("counts the wait from the moment the app is ready", () => {
    registerContentPending();
    const { result, rerender } = renderHook(
      ({ ready }) => useSplashHold(ready),
      { initialProps: { ready: false } }
    );

    act(() => vi.advanceTimersByTime(5000));
    expect(result.current).toBe(true);

    rerender({ ready: true });
    act(() => vi.advanceTimersByTime(SPLASH_CONTENT_WAIT_MS));

    expect(result.current).toBe(false);
  });

  it("stays released when new content loads start later", () => {
    const { result } = renderHook(() => useSplashHold(true));

    expect(result.current).toBe(false);

    act(() => {
      registerContentPending();
    });

    expect(result.current).toBe(false);
  });

  it("waits for every pending load, not just the first to end", () => {
    const first = registerContentPending();
    const second = registerContentPending();
    const { result } = renderHook(() => useSplashHold(true));

    act(() => first());
    expect(result.current).toBe(true);

    act(() => second());
    expect(result.current).toBe(false);
  });
});
