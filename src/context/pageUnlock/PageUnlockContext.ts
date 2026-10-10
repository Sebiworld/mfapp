import { createContext, useContext } from "react";

/**
 * Key of the opened password protected page whose content is rendered below. Files of such a page are only
 * delivered with it, so every file and image URL inside the content carries it; elsewhere it is `undefined`, which
 * keeps the URLs (and browser cache entries) of all other files unchanged.
 */
export const PageUnlockContext = createContext<string | undefined>(undefined);

/**
 * Reads the key of the surrounding password protected page.
 * @returns The key, or `undefined` outside of such a page.
 */
export const usePageUnlockKey = (): string | undefined =>
  useContext(PageUnlockContext);

/**
 * Adds the key to request parameters of a file.
 * @param params Parameters of the file request.
 * @param unlockKey Key of the surrounding page; `undefined` leaves the parameters as they are.
 * @returns The parameters, with `unlock` when a key is given.
 */
export const withUnlockKey = <T extends object>(
  params: T,
  unlockKey?: string
): T & { unlock?: string } => {
  if (!unlockKey) {
    return params;
  }

  return { ...params, unlock: unlockKey };
};
