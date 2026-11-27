import { ComponentType } from "react";
import { ProjectDetailsDto } from "@models/project-dto.model";

export interface ProjectHeaderAnimationProps {
  project: ProjectDetailsDto;
  /** Must be called once the animation is over; the header then shows the plain image. */
  onEnd: () => void;
}

/** Loads the animation module of a project on demand (`import()`), so it is not part of the main bundle. */
export type ProjectHeaderAnimationLoader = () => Promise<{
  default: ComponentType<ProjectHeaderAnimationProps>;
}>;

/**
 * Own header animations of single projects, keyed by the project page name (`project.name`). A project listed here
 * gets its animation instead of the stage light, once per session like the light.
 */
export const PROJECT_HEADER_ANIMATIONS: Readonly<
  Record<string, ProjectHeaderAnimationLoader>
> = {};
