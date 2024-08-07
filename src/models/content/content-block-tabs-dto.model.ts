import { ContentBlockDto } from './content-block-dto.model';

export interface ContentBlockTabsDto extends ContentBlockDto {
  title: string;
  hide_title: boolean;
  tab_mode: 'tabs' | 'accordion';
  items: ContentBlockTabItemDto[];
}

export interface ContentBlockTabItemDto extends ContentBlockDto {
  title: string;
  text?: string;
}
