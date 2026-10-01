import { useEffect, useState } from "react";

/**
 * Provides the current time, updated right after every full second of the wall clock, so countdowns to whole
 * seconds change in step with the clock instead of drifting against it.
 * @returns Current time in milliseconds.
 */
export const useSecondClock = (): number => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const schedule = (): void => {
      timer = setTimeout(
        () => {
          setNow(Date.now());
          schedule();
        },
        1000 - (Date.now() % 1000)
      );
    };

    schedule();

    return () => clearTimeout(timer);
  }, []);

  return now;
};
