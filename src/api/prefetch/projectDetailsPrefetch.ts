import { parseString } from "@utils/functions/parseString";
import { ProjectDetailsDto } from "@models/project-dto.model";

/** Result of a project details request: data, `true` for an unchanged answer (204), or the request error. */
export type ProjectDetailsResult = ProjectDetailsDto | true | Error;

/**
 * A started request is shared for this long: the page that loads the details ahead of its first render and the
 * project frame that loads them on mounting a moment later need only one request.
 */
export const PROJECT_DETAILS_SHARE_MAX_AGE_MS = 10_000;

interface SharedProjectDetails {
  startedAt: number;
  promise: Promise<ProjectDetailsResult>;
  /** Set once the request has finished. */
  result?: ProjectDetailsResult;
}

// Kept in memory only, per project.
const shared = new Map<number, SharedProjectDetails>();

/**
 * Loads the details of a project once for everyone who asks within a short time. A failed request is not
 * shared with later callers, they start a new one.
 * @param load Request function, e.g. `loadProjectDetails` of `useProjectsApi`; it must not throw.
 * @param projectId Project page id.
 * @returns The shared result; the promise never rejects.
 */
export const loadSharedProjectDetails = (
  load: (projectId: number) => Promise<ProjectDetailsResult>,
  projectId: number
): Promise<ProjectDetailsResult> => {
  const existing = shared.get(projectId);

  if (
    existing &&
    Date.now() - existing.startedAt <= PROJECT_DETAILS_SHARE_MAX_AGE_MS &&
    !(existing.result instanceof Error)
  ) {
    return existing.promise;
  }

  const entry: SharedProjectDetails = {
    startedAt: Date.now(),
    promise: (async () => {
      try {
        return await load(projectId);
      } catch (error) {
        return error instanceof Error ? error : new Error(parseString(error) ?? "Unknown error");
      }
    })(),
  };

  shared.set(projectId, entry);
  void entry.promise.then((result) => {
    entry.result = result;
  });

  return entry.promise;
};

/** Forgets the shared requests, e.g. after a session change or between tests. */
export const clearProjectDetailsPrefetch = (): void => {
  shared.clear();
};
