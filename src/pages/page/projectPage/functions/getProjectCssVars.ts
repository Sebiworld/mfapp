import { ProjectDetailsDto } from "@models/project-dto.model";
import { isValidArray } from "@utils/functions/isValidArray";

export const getProjectCssVars = (
  project?: ProjectDetailsDto
): { [key: string]: string } => {
  if (!isValidArray(project?.theme_vars) || !project.theme_vars.length) {
    return {};
  }

  const output: { [key: string]: string } = {};

  for (const item of project.theme_vars) {
    if (item?.name === undefined || item?.value === undefined) {
      continue;
    }
    output[`--mf-palette-projectPrimary-${item.name}`] = item.value;
  }

  return output;
};
