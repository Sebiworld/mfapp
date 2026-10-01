import { ProjectCastDto } from "@models/project-role/project-cast-dto.model";
import { ProjectPortraitDto } from "@models/project-role/project-portrait-dto.model";
import {
  ProjectRoleDto,
  ProjectRolesContainerDto,
} from "@models/project-role/project-role-dto.model";
import { ProjectSeasonDto } from "@models/project-role/project-season-dto.model";
import { CastDto, CategoryDto, SeasonDto } from "./performance-dto.model";

export interface PerformanceLocationDto {
  id: number;
  title: string;
  /** HTML, paragraphs included. */
  address?: string | null;
  lat?: number | string | null;
  lng?: number | string | null;
  /** HTML: directions and parking. */
  directions?: string | null;
  /** HTML. */
  accessibility_info?: string | null;
}

/**
 * Roles of one performance, in the shape of `GET /project-roles/{id}` but reduced to the playing casts.
 * Empty maps arrive as `[]`.
 */
export interface PerformanceRolesDto {
  roles: { [key: number]: ProjectRoleDto | ProjectRolesContainerDto };
  seasons: { [key: number]: ProjectSeasonDto };
  casts: { [key: number]: ProjectCastDto };
  portraits: { [key: number]: ProjectPortraitDto };
  child_ids: number[];
}

/** Response of `GET /performances/{id}`. */
export interface PerformanceDetailDto {
  id: number;
  title: string;
  /** Start in seconds; `null` when no start is set. */
  timestamp: number | null;
  timestamp_until: number | null;
  admission_minutes: number | null;
  ticket_url: string | null;
  /** HTML: special notes. */
  description: string | null;
  /** HTML: information for visitors. */
  visitor_info: string | null;
  event: { id: number; title: string };
  project: { id: number; title: string; url: string };
  seasons: SeasonDto[];
  casts: CastDto[];
  categories: CategoryDto[];
  location: PerformanceLocationDto | null;
  roles: PerformanceRolesDto;
  hash: string;
}
