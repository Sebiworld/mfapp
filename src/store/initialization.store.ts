import { StateCreator } from "zustand";
import { GlobalStore } from "./global.store";

export interface InitializationState {
  intializedParts: { [key: string]: boolean };
  didReceiveWelcomeMessage?: boolean;
}

export interface InitializationActions {
  registerUninitializedPart: (key: string) => void;
  setPartInitialized: (key: string) => void;
  setDidReceiveWelcomeMessage: (value: boolean) => void;
  initializeApp: () => Promise<void>;
  resetApp: (includeAuth?: boolean) => Promise<void>;
}

export type InitializationSlice = InitializationState & InitializationActions;

export const createInitializationSlice: StateCreator<
  GlobalStore,
  [],
  [],
  InitializationSlice
> = (set, get) => ({
  intializedParts: {
    configuration: false,
    pages: false,
    projects: false,
  },

  registerUninitializedPart: (key: string) =>
    set((state) => {
      if (typeof state.intializedParts !== "object") {
        state.intializedParts = {};
      }
      state.intializedParts[key] = false;
      return state;
    }),

  setPartInitialized: (key: string) =>
    set((state) => {
      if (typeof state.intializedParts !== "object") {
        state.intializedParts = {};
      }
      state.intializedParts[key] = true;
      return state;
    }),

  didReceiveWelcomeMessage: false,

  setDidReceiveWelcomeMessage: (value: boolean) => {
    set((state) => {
      state.didReceiveWelcomeMessage = value;
      return state;
    });
  },

  initializeApp: async () => {
    const initializeConfiguration = get().initializeConfiguration;
    await initializeConfiguration();

    const initializePages = get().initializePages;
    await initializePages();

    const initializeProjects = get().initializeProjects;
    await initializeProjects();
  },

  resetApp: async (includeAuth) => {
    if (includeAuth !== false) {
      const resetAuth = get().resetAuth;
      await resetAuth();
    }

    const resetConfiguration = get().resetConfiguration;
    await resetConfiguration();

    const resetPages = get().resetPages;
    await resetPages();

    const resetProjects = get().resetProjects;
    await resetProjects();

    // TODO reset other stores
  },
});

export const selectIsPartInitialized = (key: string) => (state: GlobalStore) =>
  state.intializedParts?.[key];
export const selectIsInitialized = (state: GlobalStore) =>
  state.intializedParts &&
  Object.values(state.intializedParts).every((value) => value);
export const selectInitializeApp = (state: GlobalStore) => state.initializeApp;
export const selectDidReceiveWelcomeMessage = (state: GlobalStore) =>
  state.didReceiveWelcomeMessage;
export const selectSetDidReceiveWelcomeMessage = (state: GlobalStore) =>
  state.setDidReceiveWelcomeMessage;
