import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";
import {
  createInitializationSlice,
  InitializationSlice,
} from "./initialization/initialization.store";
import { AuthSlice, createAuthSlice } from "./auth/auth.store";
import { createPagesSlice, PagesSlice } from "./pages/pages.store";
import { createProjectsSlice, ProjectsSlice } from "./projects/projects.store";
import {
  ConfigurationSlice,
  createConfigurationSlice,
} from "./configuration/configuration.store";
import {
  createProjectRolesSlice,
  ProjectRolesSlice,
} from "./projectRoles/projectRoles.store";

export type GlobalStore = InitializationSlice &
  AuthSlice &
  PagesSlice &
  ProjectsSlice &
  ProjectRolesSlice &
  ConfigurationSlice;

export const useGlobalStore = create<GlobalStore>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createInitializationSlice(...a),
        ...createAuthSlice(...a),
        ...createPagesSlice(...a),
        ...createProjectsSlice(...a),
        ...createProjectRolesSlice(...a),
        ...createConfigurationSlice(...a),
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
