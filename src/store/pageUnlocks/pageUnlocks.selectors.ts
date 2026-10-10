import { GlobalStore } from "../global.store";

/**
 * Current time in Unix seconds, the unit of `expires`.
 * @returns Seconds since the epoch.
 */
export const nowInSeconds = (): number => Math.floor(Date.now() / 1000);

/**
 * Selects the stored key of a password protected page.
 * `expires` is not compared with the device clock here: a clock running ahead would drop a fresh key before it is
 * ever sent. The server decides; a key it no longer accepts is removed with its locked answer.
 * @param pageId Id of the page; `undefined` selects nothing.
 * @returns The key, or `undefined` when none is stored.
 */
export const selectPageUnlockKey =
  (pageId: number | undefined) =>
  (state: GlobalStore): string | undefined => {
    if (!pageId) {
      return undefined;
    }

    // Stores persisted before this slice existed have no `pageUnlocks`.
    return state.pageUnlocks?.[pageId]?.key || undefined;
  };
