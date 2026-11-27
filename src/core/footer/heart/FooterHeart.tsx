import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useReducedMotion } from "@utils/hooks/useReducedMotion";
import { HEART_BURST_LOCK_MS, spawnHeartBurst } from "./heartBurst";
import { heartButtonStyles } from "./heart.styles";

const HeartAnimation = lazy(() =>
  import("./HeartAnimation").then((m) => ({ default: m.HeartAnimation }))
);

/**
 * Footer heart that loads the animation runtime only once its slot is about to scroll into view. The button has the
 * final size from the start, so nothing shifts. As a pointer-only easter egg it squeezes on press and lets brand
 * hearts rise on release; it is hidden from assistive technology and no tab stop, since it does nothing a reader
 * needs. With reduced motion it neither squeezes nor bursts.
 * @returns The heart button.
 */
export const FooterHeart: React.FC = () => {
  const isReducedMotion = useReducedMotion();
  const slotRef = useRef<HTMLSpanElement>(null);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const [isPressed, setIsPressed] = useState(false);
  // Without observer support the heart loads right away.
  const [isNear, setIsNear] = useState(
    () => typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const slot = slotRef.current;

    if (!slot || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsNear(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(slot);

    return () => observer.disconnect();
  }, []);

  useEffect(() => () => clearTimeout(lockTimerRef.current), []);

  /**
   * Squeezes the heart while the pointer is down.
   * @param event Pointer event on the heart.
   */
  const handlePointerDown = (event: React.PointerEvent<HTMLElement>): void => {
    if (isReducedMotion) {
      return;
    }

    // Keeps a long press from selecting the text around the heart.
    event.preventDefault();
    setIsPressed(true);
  };

  /** Lets the heart spring back without a burst (pointer left or was cancelled). */
  const handlePointerAbort = (): void => {
    setIsPressed(false);
  };

  /**
   * Lets the heart spring back and starts a burst, unless the hearts of the last one are still in the air.
   * @param event Pointer event on the heart.
   */
  const handlePointerUp = (event: React.PointerEvent<HTMLElement>): void => {
    setIsPressed(false);

    if (isReducedMotion || lockTimerRef.current !== undefined) {
      return;
    }

    spawnHeartBurst(event.currentTarget);
    lockTimerRef.current = setTimeout(() => {
      lockTimerRef.current = undefined;
    }, HEART_BURST_LOCK_MS);
  };

  return (
    <Box
      component="span"
      ref={slotRef}
      className={isPressed ? "heart-button is-pressed" : "heart-button"}
      aria-hidden="true"
      sx={heartButtonStyles}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerAbort}
      onPointerCancel={handlePointerAbort}
    >
      <span className="heart-press">
        {isNear && (
          <Suspense fallback={null}>
            <HeartAnimation />
          </Suspense>
        )}
      </span>
    </Box>
  );
};
