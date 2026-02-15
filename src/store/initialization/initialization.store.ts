import { StateCreator } from "zustand";
import { GlobalStore } from "../global.store";

export interface InitializationSlice {
  intializedParts: { [key: string]: boolean };
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

  didReceiveWelcomeMessage: false,
  areCookiesAllowed: null,
});
