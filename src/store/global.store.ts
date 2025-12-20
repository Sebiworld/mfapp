import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import {
  createInitializationSlice,
  InitializationSlice,
} from "./initialization/initialization.store";
import { AuthSlice, createAuthSlice } from "./auth/auth.store";
import { createPagesSlice, PagesSlice } from "./pages/pages.store";
import { createSettingsSlice, SettingsSlice } from "./settings/settings.store";
import { createProjectsSlice, ProjectsSlice } from "./projects/projects.store";
import {
  ConfigurationSlice,
  createConfigurationSlice,
} from "./configuration/configuration.store";
import {
  createProjectRolesSlice,
  ProjectRolesSlice,
} from "./projectRoles/projectRoles.store";
import {
  createPageCardsSlice,
  PageCardsSlice,
} from "./pageCards/pageCards.store";

export type GlobalStore = InitializationSlice &
  AuthSlice &
  PagesSlice &
  PageCardsSlice &
  ProjectsSlice &
  ProjectRolesSlice &
  ConfigurationSlice &
  SettingsSlice;

export const useGlobalStore = create<GlobalStore>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createInitializationSlice(...a),
        ...createAuthSlice(...a),
        ...createPagesSlice(...a),
        ...createPageCardsSlice(...a),
        ...createProjectsSlice(...a),
        ...createProjectRolesSlice(...a),
        ...createConfigurationSlice(...a),
        ...createSettingsSlice(...a),
      })),
      {
        name: "mfStore",
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) => !["intializedParts"].includes(key)
            )
          ),
      }
    )
  )
);
