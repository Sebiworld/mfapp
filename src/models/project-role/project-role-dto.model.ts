import { ImageDto } from "@models/image-dto.model";

export interface ProjectRoleDto {
  id: number;
  name: string;
  url: string;
  title: string;
  headline?: string;
  hash?: string;
  main_image?: ImageDto;
  dont_crop_main_image?: boolean;
  description?: string;
  participants?: ProjectRoleParticipantDto[];
  view_type?:
    | "as_block"
    | "as_block_with_roles"
    | "subroles_teaser"
    | "by_cast"
    | "as_cast_block";
  child_ids?: number[];
}

export interface ProjectRoleParticipantDto {
  seasons_ids?: number[];
  cast_ids?: number[];
  portrait_ids?: number[];
}
