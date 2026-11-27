/** Id of the static splash in `index.html` that shows until React renders its own splash on top of it. */
export const BOOT_SPLASH_ID = "mf-boot-splash";

/**
 * Tells how long the static splash from `index.html` has been playing, so the React splash can continue its entrance
 * and shimmer at the same point instead of starting over.
 * @returns Milliseconds since the static splash started, or 0 when there is none (already removed, or no start time).
 */
export const getBootSplashElapsedMs = (): number => {
  const start = window.__mfBootSplashStart;

  if (!document.getElementById(BOOT_SPLASH_ID) || typeof start !== "number") {
    return 0;
  }

  return Math.max(0, Math.round(performance.now() - start));
};

/**
 * Removes the static splash from `index.html` and stops its timer for the "loading takes long" hint. Safe to call
 * repeatedly and when it is already gone.
 */
export const removeBootSplash = (): void => {
  clearTimeout(window.__mfBootSlowTimer);
  document.getElementById(BOOT_SPLASH_ID)?.remove();
};
