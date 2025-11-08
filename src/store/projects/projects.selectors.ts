import { isValidObject } from "@utils/functions/isValidObject";
import { GlobalStore } from "../global.store";
import { ProjectDetailsDto } from "@models/project-dto.model";
import { isValidArray } from "@utils/functions/isValidArray";

export const selectProjects = (state: GlobalStore) =>
  state.projects?.data?.projects;

export const selectProjectColors = (state: GlobalStore) => {
  const projects = selectProjects(state);

  if (!isValidObject(projects)) {
    return undefined;
  }

  return Object.values(projects).reduce((acc, curr) => {
    if (curr?.color) {
      acc.push(`#${curr.color}`);
    }
    return acc;
  }, [] as string[]);
};

export const selectProject = (id?: number) => (state: GlobalStore) => {
  if (!id) {
    return;
  }

  return selectProjects(state)?.[id];
};

export const selectProjectPageDetails =
  (id?: number) =>
  (state: GlobalStore): ProjectDetailsDto | undefined => {
    if (!id) {
      return;
    }

    const projectDetails = state.projectDetails?.[id];
    if (projectDetails?.data?.id) {
      return projectDetails.data;
    }

    return selectProject(id)?.(state);
  };

export const selectProjectCssVars =
  (id?: number) =>
  (state: GlobalStore): { [key: string]: string } | undefined => {
    if (!id) {
      return;
    }

    const project = selectProjectPageDetails(id)(state);

    if (!isValidArray(project?.theme_vars) || !project.theme_vars.length) {
      return;
    }

    const output: { [key: string]: string } = {};

    for (const item of project.theme_vars) {
      if (item?.name === undefined || item?.value === undefined) {
        continue;
      }
      output[`--mf-palette-projectPrimary-${item.name}`] = item.value;

      if (
        item.name === "solidColor" &&
        !output["--mf-palette-projectPrimary-contrastText"]
      ) {
        output["--mf-palette-projectPrimary-contrastText"] = item.value;
      }

      if (item.name === "300" && !output["--mf-palette-projectPrimary-light"]) {
        output["--mf-palette-projectPrimary-light"] = item.value;
      }

      if (item.name === "700" && !output["--mf-palette-projectPrimary-dark"]) {
        output["--mf-palette-projectPrimary-dark"] = item.value;
      }
    }

    return output;
  };
