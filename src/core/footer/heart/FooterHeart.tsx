import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { heartAnimationStyles } from "./heart.styles";

const HeartAnimation = lazy(() =>
  import("./HeartAnimation").then((m) => ({ default: m.HeartAnimation }))
);

/**
 * Footer heart that loads the animation runtime only once its slot is about to
 * scroll into view. The placeholder has the final size, so nothing shifts.
 */
export const FooterHeart: React.FC = () => {
  const slotRef = useRef<HTMLDivElement>(null);
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

  const placeholder = <div ref={slotRef} style={heartAnimationStyles} />;

  if (!isNear) {
    return placeholder;
  }

  return (
    <Suspense fallback={<div style={heartAnimationStyles} />}>
      <HeartAnimation />
    </Suspense>
  );
};
