import { useGlobalStore } from "@src/store/global.store";
import { selectSessionVersion } from "@src/store/initialization/initialization.selectors";

/** Returned instead of an answer that was requested for a session that has ended in the meantime. */
export class SessionChangedError extends Error {
  constructor() {
    super("The session changed while the request was running.");
    this.name = "SessionChangedError";
  }
}

/**
 * Remembers the current session, so a request can drop its answer when the user logged in or out meanwhile:
 * the answer was made for the previous account and must not land in the store of the new session.
 * @returns A function that tells whether the remembered session is still the current one.
 */
export const watchSession = (): (() => boolean) => {
  const sessionVersion = selectSessionVersion(useGlobalStore.getState());

  return () =>
    selectSessionVersion(useGlobalStore.getState()) === sessionVersion;
};
