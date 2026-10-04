// `<project path>vorstellungen/<id>`, below a project path of any depth (see `getPerformanceUrl`); case-insensitive
// like the router's own path matching.
const PERFORMANCE_PATH = /^\/(?:[^/]+\/)+vorstellungen\/(\d+)\/?$/i;

/**
 * Reads the performance id from a performance page path. No CMS page may be named `vorstellungen`, so every
 * such path below a project belongs to a performance.
 * @param pathname URL path such as `/andere-projekte/concert/vorstellungen/12`.
 * @returns The numeric performance id, or `null` when the path is no performance page.
 */
export const getPerformanceIdFromPath = (pathname: string): number | null => {
  const match = PERFORMANCE_PATH.exec(pathname);

  return match ? Number(match[1]) : null;
};
