import React from "react";
import { useLocation } from "react-router";
import { getPerformanceIdFromPath } from "@utils/functions/getPerformanceIdFromPath";

const Page = React.lazy(() =>
  import("@pages/page/Page").then((module) => ({
    default: module.Page,
  }))
);
const PerformancePage = React.lazy(() =>
  import("@pages/performancePage/PerformancePage").then((module) => ({
    default: module.PerformancePage,
  }))
);

/**
 * Catch-all route: a performance path below any project path opens the performance page, every other path the
 * CMS page. A route pattern cannot express this, because project pages live at different depths.
 * @returns The performance page or the CMS page for the current path.
 */
export const CatchAllPage = (): React.JSX.Element => {
  const { pathname } = useLocation();

  return getPerformanceIdFromPath(pathname) === null ? (
    <Page />
  ) : (
    <PerformancePage />
  );
};
