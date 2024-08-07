import { ContentBlockDto } from "./content-block-dto.model";

export interface ContentBlockTimelineDto extends ContentBlockDto {
  title: string;
  hide_title: boolean;
  items: ContentBlockTimelineItemDto[];
  height_top?: number;
  height_bottom?: number;
}

export interface ContentBlockTimelineItemDto extends ContentBlockDto {
  title: string;
  subtitle?: string;
  text?: string;
  datetime_from?: number;
  datetime_until?: number;
}
