import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import {
  createInitializationSlice,
  InitializationSlice,
} from "./initialization.store";
import { AuthSlice, createAuthSlice } from "./auth.store";
import { createPagesSlice, PagesSlice } from "./pages.store";
import { createSettingsSlice, SettingsSlice } from "./settings.store";

export type GlobalStore = InitializationSlice &
  AuthSlice &
  PagesSlice &
  SettingsSlice;

export const useGlobalStore = create<GlobalStore>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createInitializationSlice(...a),
        ...createAuthSlice(...a),
        ...createPagesSlice(...a),
        ...createSettingsSlice(...a),
      })),
      { name: "mfStore" }
    )
  )
);
