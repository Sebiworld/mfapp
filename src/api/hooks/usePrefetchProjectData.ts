import { useCallback } from "react";
import { useProjectsApi } from "./useProjectsApi";
import { usePerformancesApi } from "./usePerformancesApi";
import { loadSharedProjectDetails } from "@api/prefetch/projectDetailsPrefetch";
import { loadSharedNextPerformances } from "@api/prefetch/nextPerformancesPrefetch";
import { ProjectDto } from "@models/project-dto.model";

/**
 * Longest wait for the project data before a page is shown without it; a hanging request must not keep the page
 * hidden. The parts that are still missing then appear later, as without the wait.
 */
export const PROJECT_DATA_MAX_WAIT_MS = 3_000;

/**
 * Waits for prefetch requests, but at most `PROJECT_DATA_MAX_WAIT_MS`: a hanging request must not hold back what
 * waits for it; the data then arrives later, as without the wait.
 * @param requests Requests that never reject (they resolve with data, `true` or an error).
 * @returns Promise that resolves when all requests have answered or the longest wait is over.
 */
export const waitForPrefetch = async (
  requests: Promise<unknown>[]
): Promise<void> => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const maxWait = new Promise<void>((resolve) => {
    timer = setTimeout(resolve, PROJECT_DATA_MAX_WAIT_MS);
  });

  await Promise.race([Promise.all(requests), maxWait]);
  clearTimeout(timer);
};

/**
 * Finds the project a path belongs to by the project URLs, before the page itself has answered.
 * @param projects Known projects by id.
 * @param path Path of the page.
 * @returns The project with the longest URL the path starts with, or none.
 */
export const findProjectOfPath = (
  projects: { [key: number]: ProjectDto } | undefined,
  path: string
): ProjectDto | undefined => {
  let match: ProjectDto | undefined;

  for (const project of Object.values(projects ?? {})) {
    if (
      project?.url &&
      path.startsWith(project.url) &&
      project.url.length > (match?.url.length ?? 0)
    ) {
      match = project;
    }
  }

  return match;
};

/**
 * Returns a function that loads the data a project page shows next to its own content (sidebar details and, on
 * the project's main page, the next performance), so the page can appear in one piece instead of being pushed
 * around by the parts that arrive later. The requests are shared with the components that show the data.
 * @returns `prefetchProjectData(projectId, withNextPerformances)`; it resolves when all requests have answered
 * (data, unchanged, empty or failed) or after `PROJECT_DATA_MAX_WAIT_MS`, and never rejects.
 */
export const usePrefetchProjectData = (): ((
  projectId: number,
  withNextPerformances: boolean
) => Promise<void>) => {
  const { loadProjectDetails } = useProjectsApi();
  const { loadNextPerformances } = usePerformancesApi();

  return useCallback(
    async (projectId: number, withNextPerformances: boolean): Promise<void> => {
      const requests: Promise<unknown>[] = [
        loadSharedProjectDetails(loadProjectDetails, projectId),
      ];

      if (withNextPerformances) {
        requests.push(
          loadSharedNextPerformances(loadNextPerformances, projectId)
        );
      }

      await waitForPrefetch(requests);
    },
    [loadNextPerformances, loadProjectDetails]
  );
};
