import { type Mock, vi } from "vitest";
import { fireEvent } from "@testing-library/react";

const REDUCED_MOTION_QUERY = "prefers-reduced-motion: reduce";

interface StubbedIntersectionObserver {
  report: (isIntersecting: boolean) => void;
  observed: Element[];
}

/**
 * Installs a `window.matchMedia` that answers only the reduced motion query (jsdom has none).
 * @param reduce `true` makes `(prefers-reduced-motion: reduce)` match; every other query never matches.
 */
export const setReducedMotion = (reduce: boolean): void => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: (query: string) => ({
      matches: reduce && query.includes(REDUCED_MOTION_QUERY),
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }),
  });
};

/** Removes the `window.matchMedia` of `setReducedMotion` again, back to the jsdom state without one. */
export const resetMatchMedia = (): void => {
  // @ts-expect-error jsdom provides no matchMedia; restore that state.
  delete window.matchMedia;
};

/**
 * Ends a CSS animation on an element. jsdom has no `AnimationEvent`, so React DOM listens for the prefixed name there;
 * both names are sent.
 * @param element Element whose animation ends.
 */
export const endAnimation = (element: Element): void => {
  fireEvent.animationEnd(element);
  fireEvent(element, new Event("webkitAnimationEnd", { bubbles: true }));
};

/**
 * Replaces `IntersectionObserver` with a stub the test drives by hand (undone by `vi.unstubAllGlobals()`).
 * @returns `report` calls every registered callback with one entry per observed element; `observed` lists the
 * elements currently observed by any instance.
 */
export const stubIntersectionObserver = (): StubbedIntersectionObserver => {
  const instances = new Set<StubObserver>();
  const observed: Element[] = [];

  class StubObserver {
    private readonly callback: IntersectionObserverCallback;
    private readonly targets: Element[] = [];

    constructor(callback: IntersectionObserverCallback) {
      this.callback = callback;
      instances.add(this);
    }

    observe(target: Element): void {
      this.targets.push(target);
      observed.push(target);
    }

    unobserve(target: Element): void {
      this.forget(target);
    }

    disconnect(): void {
      for (const target of [...this.targets]) {
        this.forget(target);
      }

      instances.delete(this);
    }

    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }

    /**
     * Calls the callback with one entry per observed element.
     * @param isIntersecting Value of every entry.
     */
    fire(isIntersecting: boolean): void {
      // Cast: callbacks only read target and the intersection flags of an entry.
      const entries = this.targets.map(
        (target) =>
          ({
            target,
            isIntersecting,
            intersectionRatio: isIntersecting ? 1 : 0,
          }) as unknown as IntersectionObserverEntry
      );

      // Cast: the stub stands in for the observer the callback expects.
      this.callback(entries, this as unknown as IntersectionObserver);
    }

    /**
     * Drops an element from this instance and from the shared list.
     * @param target Element to drop.
     */
    private forget(target: Element): void {
      const own = this.targets.indexOf(target);

      if (own >= 0) {
        this.targets.splice(own, 1);
      }

      const shared = observed.indexOf(target);

      if (shared >= 0) {
        observed.splice(shared, 1);
      }
    }
  }

  vi.stubGlobal("IntersectionObserver", StubObserver);

  return {
    report: (isIntersecting) => {
      for (const instance of [...instances]) {
        instance.fire(isIntersecting);
      }
    },
    observed,
  };
};

interface ViewTransitionStub {
  start: Mock<(update?: ViewTransitionUpdateCallback) => ViewTransition>;
  animate: Mock<(...args: Parameters<Element["animate"]>) => Animation>;
  htmlClassesAfterUpdate: string[];
  finish: (index?: number) => Promise<void>;
}

/**
 * Installs a `document.startViewTransition` and a `document.documentElement.animate` (jsdom has neither), undone by
 * `removeViewTransitionStub()`. Like a browser, the stub runs the update callback after the current task.
 * @param skipped `true` makes every transition skip its animation: `ready` rejects, `finished` still resolves.
 * @returns `start` and `animate` record the calls; `htmlClassesAfterUpdate` holds the class attribute of `<html>`
 * right after each update callback; `finish` resolves `finished` of the transition with the given call index (all
 * so far without one) and waits for its handlers.
 */
export const stubViewTransition = (skipped = false): ViewTransitionStub => {
  const finishers: (() => void)[] = [];
  const htmlClassesAfterUpdate: string[] = [];

  const start = vi.fn((update?: ViewTransitionUpdateCallback) => {
    const updateCallbackDone = (async () => {
      await Promise.resolve();
      await update?.();
      htmlClassesAfterUpdate.push(document.documentElement.className);
    })();
    const ready = (async () => {
      await updateCallbackDone;

      if (skipped) {
        throw new DOMException("Skipped", "AbortError");
      }
    })();
    const finished = new Promise<void>((resolve) => finishers.push(resolve));

    // Cast: callers only read the three promises.
    return {
      ready,
      finished,
      updateCallbackDone,
    } as unknown as ViewTransition;
  });
  // Cast: callers do not read the returned animation.
  const animate = vi.fn(() => ({}) as Animation);

  Object.defineProperty(document, "startViewTransition", {
    configurable: true,
    writable: true,
    value: start,
  });
  Object.defineProperty(document.documentElement, "animate", {
    configurable: true,
    writable: true,
    value: animate,
  });

  return {
    start,
    animate,
    htmlClassesAfterUpdate,
    finish: async (index) => {
      for (const resolve of index === undefined
        ? finishers
        : [finishers[index]]) {
        resolve();
      }

      await new Promise((resolve) => setTimeout(resolve, 0));
    },
  };
};

/** Removes the stubs of `stubViewTransition` again, back to the jsdom state without the API. */
export const removeViewTransitionStub = (): void => {
  // @ts-expect-error jsdom provides no startViewTransition; restore that state.
  delete document.startViewTransition;
  // @ts-expect-error jsdom provides no animate; restore that state.
  delete document.documentElement.animate;
};
