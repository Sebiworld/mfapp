import { StateCreator } from "zustand";
import { GlobalStore } from "../global.store";

/** Where a key came from: entered password on this device, or the account's unlock delivered with the page. */
export type PageUnlockSource = "password" | "account";

export interface PageUnlock {
  key: string;
  /** Unix seconds, by the server's clock. */
  expires: number;
  source: PageUnlockSource;
  /** Created while signed in; such keys are removed on logout. */
  signedIn: boolean;
}

export interface PageUnlocksSlice {
  /** Keys of opened password protected pages, by page id. */
  pageUnlocks: { [pageId: string]: PageUnlock };
}

export const createPageUnlocksSlice: StateCreator<
  GlobalStore,
  [],
  [],
  PageUnlocksSlice
> = () => ({
  pageUnlocks: {},
});
