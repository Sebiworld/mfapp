
import { PageCardDto } from '@models/page/page-card-dto.model';
import { ContentBlockDto } from './content-block-dto.model';

export interface ContentBlockPagesDto extends ContentBlockDto {
  type: 'pages';
  title?: string;
  hide_title?: boolean;
  items: PageCardDto[];
}
