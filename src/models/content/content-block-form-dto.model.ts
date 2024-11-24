import { ContentBlockDto } from "./content-block-dto.model";

export interface ContentBlockFormDto extends ContentBlockDto {
  title?: string;
  hide_title?: boolean;
}
