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
import {
  createPageUnlocksSlice,
  PageUnlocksSlice,
} from "./pageUnlocks/pageUnlocks.store";

/** Raised whenever the persisted shape changes in a way `migratePersistedStore` has to handle. */
const PERSISTED_STORE_VERSION = 1;

/**
 * Brings a persisted store of an earlier app version into the current shape.
 * Version 0 stored pages without `locked`: such a copy may hold the full content of a page that is password
 * protected by now, and it would be shown until the new answer arrives. These copies are dropped.
 * @param persisted Persisted state as read from storage.
 * @param version Version the state was written with.
 * @returns The state to merge into the store.
 */
export const migratePersistedStore = (
  persisted: unknown,
  version: number
): Partial<GlobalStore> => {
  const state = { ...((persisted ?? {}) as Partial<GlobalStore>) };

  if (version < 1 && state.pages) {
    state.pages = Object.fromEntries(
      Object.entries(state.pages).filter(
        ([, page]) => typeof page?.locked === "boolean"
      )
    );
  }

  return state;
};

export type GlobalStore = InitializationSlice &
  AuthSlice &
  PagesSlice &
  ProjectsSlice &
  ProjectRolesSlice &
  ConfigurationSlice &
  PageUnlocksSlice;

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
        ...createPageUnlocksSlice(...a),
      })),
      {
        name: "mfStore",
        version: PERSISTED_STORE_VERSION,
        migrate: migratePersistedStore,
        partialize: (state) =>
          Object.fromEntries(
            Object.entries(state).filter(
              ([key]) => !["intializedParts", "sessionVersion"].includes(key)
            )
          ),
      }
    )
  )
);
