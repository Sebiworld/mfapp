import { ContentBlockDto } from './content-block-dto.model';

export interface ContentBlockContainerDto extends ContentBlockDto {
  title: string;
  hide_title: boolean;
}
