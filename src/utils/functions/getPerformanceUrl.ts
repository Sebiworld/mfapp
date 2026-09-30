/**
 * Builds the path of a performance page below its project page.
 * @param projectUrl Project path such as `/projekte/annie/`; the trailing slash may be missing.
 * @param performanceId `id` of the performance entry.
 * @returns Path in the form `<projectUrl>auffuehrungen/<id>`.
 */
export const getPerformanceUrl = (
  projectUrl: string,
  performanceId: number
): string => {
  const base = projectUrl.endsWith("/") ? projectUrl : `${projectUrl}/`;

  return `${base}auffuehrungen/${performanceId}`;
};
