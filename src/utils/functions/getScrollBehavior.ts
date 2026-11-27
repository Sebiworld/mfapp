/**
 * Scroll behavior for `scrollIntoView` / `scrollTo` calls from code; the global `scroll-behavior` rule only covers
 * anchor jumps.
 * @returns `"auto"` (jump) while the user asks for reduced motion, otherwise `"smooth"`; `"smooth"` without
 * `window.matchMedia`.
 */
export const getScrollBehavior = (): ScrollBehavior => {
  if (
    typeof window === "undefined" ||
    typeof window.matchMedia !== "function"
  ) {
    return "smooth";
  }

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
};
