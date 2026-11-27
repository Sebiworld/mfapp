import {
  PointerEvent,
  PointerEventHandler,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useReducedMotion } from "./useReducedMotion";

export interface PointerSpotlightHandlers {
  /** Puts the spotlight under the mouse right away. */
  onPointerEnter: PointerEventHandler<HTMLElement>;
  /** Follows the mouse, written in the next animation frame. */
  onPointerMove: PointerEventHandler<HTMLElement>;
  /** Drops a move that has not been written yet. */
  onPointerLeave: PointerEventHandler<HTMLElement>;
}

interface PendingSpot {
  target: HTMLElement;
  clientX: number;
  clientY: number;
}

/**
 * Writes the pointer position as `--spot-x` / `--spot-y` (percent of the element box) on the element.
 * @param spot Element and pointer position in viewport coordinates.
 */
const writeSpot = ({ target, clientX, clientY }: PendingSpot): void => {
  const rect = target.getBoundingClientRect();

  if (!rect.width || !rect.height) {
    return;
  }

  const x = ((clientX - rect.left) / rect.width) * 100;
  const y = ((clientY - rect.top) / rect.height) * 100;

  target.style.setProperty("--spot-x", `${x.toFixed(2)}%`);
  target.style.setProperty("--spot-y", `${y.toFixed(2)}%`);
};

/**
 * Lets a spotlight follow the mouse over an element: the handlers write the pointer position as the custom
 * properties `--spot-x` / `--spot-y` on the element the handlers are attached to, which its styles read. Moves are
 * written at most once per animation frame and never through React state, so following the mouse renders nothing.
 * Touch and pen are ignored (a finger has no hover), and with reduced motion the spotlight stays where the styles put
 * it.
 * @returns Pointer handlers to spread on one or more elements.
 */
export const usePointerSpotlight = (): PointerSpotlightHandlers => {
  const isReducedMotion = useReducedMotion();
  const frameRef = useRef(0);
  const pendingRef = useRef<PendingSpot | null>(null);

  useEffect(
    () => () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = 0;
      }

      pendingRef.current = null;
    },
    []
  );

  return useMemo(() => {
    /**
     * Tells whether a pointer event should move the spotlight.
     * @param event Pointer event on the element.
     * @returns `true` for a mouse without reduced motion.
     */
    const isFollowed = (event: PointerEvent<HTMLElement>): boolean =>
      !isReducedMotion && event.pointerType === "mouse";

    return {
      onPointerEnter: (event) => {
        if (!isFollowed(event)) {
          return;
        }

        // Entering places the light at once, so it does not fade in at the previous position.
        pendingRef.current = null;
        writeSpot({
          target: event.currentTarget,
          clientX: event.clientX,
          clientY: event.clientY,
        });
      },
      onPointerMove: (event) => {
        if (!isFollowed(event)) {
          return;
        }

        // React clears `currentTarget` after the handler, so the element is kept with the position.
        pendingRef.current = {
          target: event.currentTarget,
          clientX: event.clientX,
          clientY: event.clientY,
        };

        if (frameRef.current) {
          return;
        }

        frameRef.current = requestAnimationFrame(() => {
          frameRef.current = 0;
          const pending = pendingRef.current;
          pendingRef.current = null;

          if (pending) {
            writeSpot(pending);
          }
        });
      },
      onPointerLeave: (event) => {
        // The light fades out where it is; a move still waiting for its frame must not shift it.
        if (pendingRef.current?.target === event.currentTarget) {
          pendingRef.current = null;
        }
      },
    };
  }, [isReducedMotion]);
};
