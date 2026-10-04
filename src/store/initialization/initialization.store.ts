import { StateCreator } from "zustand";
import { GlobalStore } from "../global.store";

export interface InitializationSlice {
  intializedParts: { [key: string]: boolean };
  /**
   * Counts the session changes (login, logout, ended session) of this visit. Views that hold data of the
   * previous session start over when it changes. Not persisted: a new visit starts without old views.
   */
  sessionVersion: number;
  didReceiveWelcomeMessage?: boolean;
  areCookiesAllowed: boolean | null;
}

export const createInitializationSlice: StateCreator<
  GlobalStore,
  [],
  [],
  InitializationSlice
> = () => ({
  intializedParts: {
    auth: false,
    configuration: false,
    pages: false,
    projects: false,
    projectRoles: false,
    app: false
  },
  sessionVersion: 0,

  didReceiveWelcomeMessage: false,
  areCookiesAllowed: null,
});
