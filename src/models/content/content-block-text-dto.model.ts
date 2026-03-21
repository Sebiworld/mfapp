import { ContentBlockDto } from "./content-block-dto.model";

export interface ContentBlockTextDto extends ContentBlockDto {
  type: "text";
  title: string;
  hide_title: boolean;
  text: string;
}
