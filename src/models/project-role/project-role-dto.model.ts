import { ImageDto } from "@models/image-dto.model";
import { TemplateDto } from "@models/template-dto.model";

export interface ProjectRoleDto {
  id: number;
  name: string;
  url: string;
  template: TemplateDto;
  title: string;
  headline?: string;
  main_image?: ImageDto;
  dont_crop_main_image?: boolean;
  description?: string;
  amount?: number;
  participants?: ProjectRoleParticipantDto[];
  view_type?:
    | "as_block"
    | "as_block_with_roles"
    | "subroles_teaser"
    | "by_cast"
    | "as_cast_block";
  child_ids?: number[];
  hash?: string;
}

export interface ProjectRoleParticipantDto {
  season_ids?: number[];
  cast_ids?: number[];
  portrait_ids?: number[];
  amount_positions_available?: number;
}

export interface ProjectRolesContainerDto {
  id: number;
  name: string;
  url: string;
  template: TemplateDto;
  title: string;
  headline?: string;
  view_type?:
    | "as_block"
    | "as_block_with_roles"
    | "subroles_teaser"
    | "by_cast"
    | "as_cast_block";
  child_ids?: number[];
  hash?: string;
}
