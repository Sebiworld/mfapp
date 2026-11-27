import { useMediaQuery } from "@mui/material";

/**
 * Follows the "reduce motion" setting of the operating system, also while the page is open.
 * Reads the media query on the first render (`noSsr`), so a component never starts an animation it would stop
 * right after.
 * @returns `true` while the user asks for reduced motion.
 */
export const useReducedMotion = (): boolean =>
  useMediaQuery("(prefers-reduced-motion: reduce)", { noSsr: true });
