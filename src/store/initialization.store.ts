import { StateCreator } from "zustand";
import { GlobalStore } from "./global.store";

export interface InitializationState {
  intializedParts: { [key: string]: boolean };
}

export interface InitializationActions {
  registerUninitializedPart: (key: string) => void;
  setPartInitialized: (key: string) => void;
}

export type InitializationSlice = InitializationState & InitializationActions;

export const createInitializationSlice: StateCreator<
  GlobalStore,
  [],
  [],
  InitializationSlice
> = (set) => ({
  intializedParts: {
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
});

export const selectRegisterUninitializedPart = (state: GlobalStore) =>
  state.registerUninitializedPart;
export const selectSetPartInitialized = (state: GlobalStore) =>
  state.setPartInitialized;
export const selectIsPartInitialized = (key: string) => (state: GlobalStore) =>
  state.intializedParts?.[key];
export const selectIsInitialized = (state: GlobalStore) =>
  state.intializedParts &&
  Object.values(state.intializedParts).every((value) => value);
