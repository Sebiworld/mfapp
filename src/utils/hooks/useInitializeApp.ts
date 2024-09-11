import {
  selectIsInitialized,
  selectSetPartInitialized,
} from "@src/store/initialization.store";
import { selectLoadProjects } from "@src/store/pages.store";
import { useGlobalStore } from "@src/store/global.store";
import { useCallback, useEffect } from "react";

export const useInitializeApp = () => {
  const isInitialized = useGlobalStore(selectIsInitialized);
  const loadProjects = useGlobalStore(selectLoadProjects);
  const setPartInitialized = useGlobalStore(selectSetPartInitialized);

  const initializeApp = useCallback(async () => {
    await loadProjects();
    setPartInitialized("projects");
  }, [loadProjects, setPartInitialized]);

  useEffect(() => {
    initializeApp();
  }, [initializeApp, loadProjects, setPartInitialized]);

  return { isInitialized };
};
