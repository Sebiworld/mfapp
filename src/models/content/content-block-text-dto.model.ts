import { ContentBlockDto } from "./content-block-dto.model";

export interface ContentBlockTextDto extends ContentBlockDto {
  title: string;
  hide_title: boolean;
  text: string;
}
