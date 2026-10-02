import { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import {
  installVersionCheck,
  reloadIfNewVersionAvailable,
} from "@utils/functions/newVersionReload";

/**
 * Keeps the open app current after a deploy: checks the deployed build whenever the tab becomes visible and,
 * once a newer one exists, reloads at the next page change instead of interrupting the current one.
 */
export const useReloadOnNewVersion = (): void => {
  const { pathname } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => installVersionCheck(__BUILD_ID__), []);

  useEffect(() => {
    if (previousPathname.current === pathname) {
      return;
    }

    previousPathname.current = pathname;
    reloadIfNewVersionAvailable();
  }, [pathname]);
};
