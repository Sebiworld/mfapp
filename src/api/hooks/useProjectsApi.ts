import { MFApi } from "@api/axios/mfApi";
import { GetProjectsResponse } from "@api/axios/projectsApi";
import { ProjectDetailsDto } from "@models/project-dto.model";
import { useGlobalStore } from "@src/store/global.store";
import { initializationStoreActions } from "@src/store/initialization/initialization.actions";
import { projectsStoreActions } from "@src/store/projects/projects.actions";
import { useCallback } from "react";

interface UseProjectsApiOutput {
  loadProjects: () => Promise<GetProjectsResponse | true | Error>;
  loadProjectDetails: (
    projectId: number
  ) => Promise<ProjectDetailsDto | true | Error>;
  initialize: () => Promise<void>;
}

export const useProjectsApi = (): UseProjectsApiOutput => {
  /**
   * Loads basic data for all available projects (colors, names, etc.)
   */
  const loadProjects = useCallback(async (): Promise<
    GetProjectsResponse | true | Error
  > => {
    try {
      const params: { [key: string]: unknown } = {};
      const hash = useGlobalStore.getState().projectsHash;
      if (hash) {
        params.hash = hash;
      }

      const response = await MFApi.getProjects(params);
      const projectsResponse = response.data as GetProjectsResponse;

      if (response.status === 204) {
        return true;
      }

      projectsStoreActions.setProjectsData(
        projectsResponse.projects,
        projectsResponse.hash
      );

      return projectsResponse ?? true;
    } catch (error) {
      console.error("Error in data fetch:", error);
      return error as Error;
    }
  }, []);

  const loadProjectDetails = useCallback(
    async (projectId: number): Promise<ProjectDetailsDto | true | Error> => {
      try {
        const params: { [key: string]: unknown } = {};
        const projectDetails =
          useGlobalStore.getState().projectDetails?.[projectId];
        const hash = projectDetails?.hash;
        if (hash) {
          params.hash = hash;
        }

        const response = await MFApi.getProjectDetails(projectId, params);
        const projectDetailsResponse = response.data as ProjectDetailsDto;

        if (response.status === 204) {
          return true;
        }

        projectsStoreActions.setProjectDetailsData(
          projectId,
          projectDetailsResponse
        );

        return projectDetailsResponse ?? true;
      } catch (error) {
        console.error("Error in data fetch:", error);
        return error as Error;
      }
    },
    []
  );

  const initialize = useCallback(async () => {
    await loadProjects();

    initializationStoreActions.setPartInitialized("projects");
  }, [loadProjects]);

  return { loadProjects, loadProjectDetails, initialize };
};
