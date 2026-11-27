/**
 * Module-wide signal "the splash screen is gone". Motion that should be seen, not spent under the splash, waits for
 * it. Lives in memory only, so every page load starts with the splash still there.
 */
let isGone = false;
const listeners = new Set<() => void>();

/** Marks the splash as gone and notifies every subscriber; later calls change nothing. */
export const markSplashGone = (): void => {
  if (isGone) {
    return;
  }

  isGone = true;

  for (const listener of [...listeners]) {
    listener();
  }
};

/**
 * Reads the signal.
 * @returns `true` once the splash is gone.
 */
export const isSplashGone = (): boolean => isGone;

/**
 * Registers a listener for the moment the splash is gone.
 * @param listener Called when the signal changes.
 * @returns Function that removes the listener again.
 */
export const subscribeSplashGone = (listener: () => void): (() => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

/**
 * Module-wide count of first-content loads that are still running ("the page has nothing to show yet"). The splash
 * screen waits for them, so it does not leave over an empty page. Lives in memory only.
 */
let pendingContentLoads = 0;
const contentListeners = new Set<() => void>();

/**
 * Registers a running first-content load. Every call needs its returned function called once the load ends.
 * @returns Function that ends this registration; calling it again changes nothing.
 */
export const registerContentPending = (): (() => void) => {
  let isOpen = true;
  pendingContentLoads += 1;
  notifyContent();

  return () => {
    if (!isOpen) {
      return;
    }

    isOpen = false;
    pendingContentLoads -= 1;
    notifyContent();
  };
};

/**
 * Reads whether a first-content load is running.
 * @returns `true` while at least one load is registered.
 */
export const isContentPending = (): boolean => pendingContentLoads > 0;

/**
 * Registers a listener for changes of the pending state.
 * @param listener Called whenever a load starts or ends.
 * @returns Function that removes the listener again.
 */
export const subscribeContentPending = (listener: () => void): (() => void) => {
  contentListeners.add(listener);

  return () => {
    contentListeners.delete(listener);
  };
};

/** Notifies the pending-state listeners. */
function notifyContent(): void {
  for (const listener of [...contentListeners]) {
    listener();
  }
}
