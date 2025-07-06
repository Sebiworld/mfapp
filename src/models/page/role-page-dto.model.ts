import { PageDto } from "./page-dto.model";
import { ContentBlockDtoVariant } from "@models/content/content-block-dto-variant.model";

export interface RolePageDto extends PageDto {
  contents: ContentBlockDtoVariant[];
  intro?: string;
}
