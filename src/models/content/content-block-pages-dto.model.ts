
import { PageCardDto } from '@models/page/page-card-dto.model';
import { ContentBlockDto } from './content-block-dto.model';

export interface ContentBlockPagesDto extends ContentBlockDto {
  title?: string;
  hide_title?: boolean;
  items: PageCardDto[];
}
