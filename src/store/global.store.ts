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
import { createProjectsSlice, ProjectsSlice } from "./projects.store";
import {
  ConfigurationSlice,
  createConfigurationSlice,
} from "./configuration.store";

export type GlobalStore = InitializationSlice &
  AuthSlice &
  PagesSlice &
  ProjectsSlice &
  ConfigurationSlice &
  SettingsSlice;

export const useGlobalStore = create<GlobalStore>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createInitializationSlice(...a),
        ...createAuthSlice(...a),
        ...createPagesSlice(...a),
        ...createProjectsSlice(...a),
        ...createConfigurationSlice(...a),
        ...createSettingsSlice(...a),
      })),
      { name: "mfStore" }
    )
  )
);
