import { cssTransition, Slide, ToastTransition } from "react-toastify";
import { useReducedMotion } from "@utils/hooks/useReducedMotion";

/**
 * Fade without movement; the keyframes live in `toastify.styles.ts`. A faded toast is removed at once instead of
 * letting its height collapse, which would slide the toasts below it.
 */
export const TOAST_FADE: ToastTransition = cssTransition({
  enter: "mf-toast-fade-in",
  exit: "mf-toast-fade-out",
  collapse: false,
});

/**
 * Transition of the toast container: toasts slide in from their edge, with reduced motion they only fade.
 * @returns `Slide`, or `TOAST_FADE` while the user asks for reduced motion.
 */
export const useToastTransition = (): ToastTransition => {
  const isReducedMotion = useReducedMotion();

  return isReducedMotion ? TOAST_FADE : Slide;
};
