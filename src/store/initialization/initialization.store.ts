import { StateCreator } from "zustand";
import { GlobalStore } from "../global.store";

export interface InitializationSlice {
  intializedParts: { [key: string]: boolean };
  didReceiveWelcomeMessage?: boolean;
}

export const createInitializationSlice: StateCreator<
  GlobalStore,
  [],
  [],
  InitializationSlice
> = () => ({
  intializedParts: {
    configuration: false,
    pages: false,
    projects: false,
  },

  didReceiveWelcomeMessage: false,
});

