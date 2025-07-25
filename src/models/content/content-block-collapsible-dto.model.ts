import { ContentBlockDto } from "./content-block-dto.model";

export interface ContentBlockCollapsibleDto extends ContentBlockDto {
  type: "collapsible";
  title: string;
  hide_title: boolean;
  tab_mode: "tabs" | "accordion";
  items: ContentBlockCollapsibleItemDto[];
}

export interface ContentBlockCollapsibleItemDto extends ContentBlockDto {
  title: string;
  content?: string;
}
