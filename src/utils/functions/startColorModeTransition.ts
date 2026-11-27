import { flushSync } from "react-dom";

interface Point {
  x: number;
  y: number;
}

const CIRCLE_CLASS = "vt-circle";
const FADE_CLASS = "vt-fade";
const CIRCLE_DURATION_MS = 450;
const CIRCLE_EASING = "cubic-bezier(0.23, 1, 0.32, 1)";

// Starting a transition ends the running one; only the latest may remove its class from <html>.
let latestTransition = 0;

/**
 * Grows the new colour scheme as a circle from the origin until it covers the farthest corner of the viewport.
 * @param transition Running view transition.
 * @param origin Centre of the circle in viewport pixels.
 */
const growCircle = async (
  transition: ViewTransition,
  origin: Point
): Promise<void> => {
  try {
    await transition.ready;
  } catch {
    // The browser skipped the animation (hidden tab, newer transition); the new colours are already shown.
    return;
  }

  const { x, y } = origin;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

  document.documentElement.animate(
    {
      clipPath: [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${radius}px at ${x}px ${y}px)`,
      ],
    },
    {
      duration: CIRCLE_DURATION_MS,
      easing: CIRCLE_EASING,
      pseudoElement: "::view-transition-new(root)",
    }
  );
};

/**
 * Removes the class of a transition from `<html>` once it has ended, unless a newer transition took over.
 * @param transition Running view transition.
 * @param className Class that styles the transition's pseudo-elements.
 * @param id Number of the transition, compared with the latest one.
 */
const removeClassWhenDone = async (
  transition: ViewTransition,
  className: string,
  id: number
): Promise<void> => {
  try {
    await transition.finished;
  } catch {
    // Only a failing update callback rejects; React reports that error itself.
  } finally {
    if (id === latestTransition) {
      document.documentElement.classList.remove(className);
    }
  }
};

/**
 * Changes the colour scheme inside a view transition: the new colours spread as a circle from the origin, or fade
 * in with reduced motion. Without the View Transitions API the change happens at once.
 * @param apply Changes the colour scheme. Runs inside `flushSync`, so React has updated the page before the browser
 * captures the new state.
 * @param origin Start of the circle in viewport pixels, usually the middle of the button.
 * @param reducedMotion `true` replaces the circle with a short cross-fade.
 */
export const startColorModeTransition = (
  apply: () => void,
  origin: Point,
  reducedMotion: boolean
): void => {
  // Declared in the DOM types, but missing in older browsers and in jsdom.
  if (typeof document.startViewTransition !== "function") {
    apply();
    return;
  }

  const root = document.documentElement;
  const className = reducedMotion ? FADE_CLASS : CIRCLE_CLASS;
  latestTransition += 1;
  const id = latestTransition;

  root.classList.remove(CIRCLE_CLASS, FADE_CLASS);
  root.classList.add(className);

  const transition = document.startViewTransition(() => {
    flushSync(apply);
  });

  if (!reducedMotion) {
    void growCircle(transition, origin);
  }

  void removeClassWhenDone(transition, className, id);
};
