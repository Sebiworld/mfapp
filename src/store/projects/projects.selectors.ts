import { isValidObject } from "@utils/functions/isValidObject";
import { GlobalStore } from "../global.store";
import { ProjectDetailsDto } from "@models/project-dto.model";
import { isValidArray } from "@utils/functions/isValidArray";
import { hexToRgb } from "@utils/functions/hexToRgb";

export const selectProjects = (state: GlobalStore) => state.projects;

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
    if (projectDetails?.id) {
      return projectDetails;
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
      if (
        item?.name === undefined ||
        item?.value === undefined ||
        typeof item.name !== "string"
      ) {
        continue;
      }

      if (item.name.startsWith("--")) {
        output[item.name] = item.value;
        continue;
      }

      output[`--mf-palette-projectPrimary-${item.name}`] = item.value;
    }

    // Contrast text
    if (!output["--mf-palette-projectPrimary-contrastText"]) {
      output["--mf-palette-projectPrimary-contrastText"] =
        output["--mf-palette-projectPrimary-solidColor"];
    }

    // light
    if (!output["--mf-palette-projectPrimary-light"]) {
      output["--mf-palette-projectPrimary-light"] =
        output["--mf-palette-projectPrimary-300"];
    }

    // dark
    if (!output["--mf-palette-projectPrimary-dark"]) {
      output["--mf-palette-projectPrimary-dark"] =
        output["--mf-palette-projectPrimary-700"];
    }

    // Light Rgb
    if (!output["--mf-palette-projectPrimary-lightRgb"]) {
      output["--mf-palette-projectPrimary-lightRgb"] =
        hexToRgb(output["--mf-palette-projectPrimary-200"], true) || "";
    }

    // Main Rgb
    if (!output["--mf-palette-projectPrimary-mainRgb"]) {
      output["--mf-palette-projectPrimary-mainRgb"] =
        hexToRgb(output["--mf-palette-projectPrimary-500"], true) || "";
    }

    // Dark Rgb
    if (!output["--mf-palette-projectPrimary-lightRgb"]) {
      output["--mf-palette-projectPrimary-lightRgb"] =
        hexToRgb(output["--mf-palette-projectPrimary-700"], true) || "";
    }

    // Light Channel
    if (!output["--mf-palette-projectPrimary-lightChannel"]) {
      output["--mf-palette-projectPrimary-lightChannel"] =
        output["--mf-palette-projectPrimary-lightRgb"]?.replaceAll(",", " ") ||
        "";
    }

    // Main Channel
    if (!output["--mf-palette-projectPrimary-mainChannel"]) {
      output["--mf-palette-projectPrimary-mainChannel"] =
        output["--mf-palette-projectPrimary-mainRgb"]?.replaceAll(",", " ") ||
        "";
    }

    // Dark Channel
    if (!output["--mf-palette-projectPrimary-darkChannel"]) {
      output["--mf-palette-projectPrimary-darkChannel"] =
        output["--mf-palette-projectPrimary-darkRgb"]?.replaceAll(",", " ") ||
        "";
    }

    // Alert filled color
    if (!output["--mf-palette-Alert-projectPrimaryFilledColor"]) {
      output["--mf-palette-Alert-projectPrimaryFilledColor"] =
        output["--mf-palette-projectPrimary-solidColor"];
    }

    // Alert filled bg
    if (!output["--mf-palette-Alert-projectPrimaryFilledBg"]) {
      output["--mf-palette-Alert-projectPrimaryFilledBg"] =
        output["--mf-palette-projectPrimary-500"];
    }

    // Alert icon color
    if (!output["--mf-palette-Alert-projectPrimaryIconColor"]) {
      output["--mf-palette-Alert-projectPrimaryIconColor"] =
        output["--mf-palette-projectPrimary-500"];
    }

    // Alert standard color
    if (!output["--mf-palette-Alert-projectPrimaryColor"]) {
      output["--mf-palette-Alert-projectPrimaryColor"] =
        output["--mf-palette-projectPrimary-800"];
    }

    // Alert standard bg
    if (!output["--mf-palette-Alert-projectPrimaryStandardBg"]) {
      output["--mf-palette-Alert-projectPrimaryStandardBg"] =
        `rgba(${output["--mf-palette-projectPrimary-mainRgb"]}, 0.2)`;
    }

    return output;
  };
