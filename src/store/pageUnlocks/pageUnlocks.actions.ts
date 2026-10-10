import { useGlobalStore } from "../global.store";
import { PageUnlockSource } from "./pageUnlocks.store";
import { nowInSeconds } from "./pageUnlocks.selectors";
import { selectIsLoggedIn } from "../auth/auth.selectors";

/**
 * Keys stay this long after `expires` (by the device clock) before they are cleaned up, so a device clock running
 * ahead does not drop a key the server still accepts.
 */
const EXPIRED_KEY_GRACE_SECONDS = 24 * 60 * 60;

/**
 * Stores the key of a password protected page, noting whether it was created while signed in.
 * @param pageId Id of the page.
 * @param key Key as delivered by the API.
 * @param expires Unix seconds until the key is valid.
 * @param source Entered password or the account's unlock.
 */
const setPageUnlock = (
  pageId: number,
  key: string,
  expires: number,
  source: PageUnlockSource
): void => {
  useGlobalStore.setState((state) => ({
    pageUnlocks: {
      ...(state.pageUnlocks ?? {}),
      [pageId]: {
        key,
        expires,
        source,
        signedIn: source === "account" || selectIsLoggedIn(state),
      },
    },
  }));
};

/**
 * Removes the key of a page, e.g. when the API no longer accepts it (password changed).
 * @param pageId Id of the page.
 */
const removePageUnlock = (pageId: number): void => {
  useGlobalStore.setState((state) => {
    if (!state.pageUnlocks?.[pageId]) {
      return {};
    }

    const pageUnlocks = { ...state.pageUnlocks };
    delete pageUnlocks[pageId];

    return { pageUnlocks };
  });
};

/**
 * Removes stored responses that were opened with a key that has expired by now, so their content is not shown from
 * the cache while the page is requested again, and cleans up keys long past their expiry.
 * @param now Unix seconds to compare `expires` with.
 */
const removeExpiredPageUnlocks = (now: number = nowInSeconds()): void => {
  useGlobalStore.setState((state) => {
    const pageUnlocks = { ...(state.pageUnlocks ?? {}) };
    const pages = { ...state.pages };
    let changed = false;

    for (const pageId of Object.keys(pageUnlocks)) {
      if (!(pageUnlocks[pageId]?.expires + EXPIRED_KEY_GRACE_SECONDS > now)) {
        delete pageUnlocks[pageId];
        changed = true;
      }
    }

    for (const path of Object.keys(pages)) {
      const expires = pages[path]?.expires;

      if (typeof expires === "number" && !(expires > now)) {
        delete pages[path];
        changed = true;
      }
    }

    if (!changed) {
      return {};
    }

    return { pageUnlocks, pages };
  });
};

/** Removes every key created while signed in, so the pages do not stay open on the device after logging out. */
const removeSignedInPageUnlocks = (): void => {
  useGlobalStore.setState((state) => {
    const pageUnlocks = { ...(state.pageUnlocks ?? {}) };

    for (const pageId of Object.keys(pageUnlocks)) {
      const unlock = pageUnlocks[pageId];

      if (unlock?.signedIn || unlock?.source === "account") {
        delete pageUnlocks[pageId];
      }
    }

    return { pageUnlocks };
  });
};

export const pageUnlocksStoreActions = {
  setPageUnlock,
  removePageUnlock,
  removeExpiredPageUnlocks,
  removeSignedInPageUnlocks,
};
