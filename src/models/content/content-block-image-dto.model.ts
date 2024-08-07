
import { ImageDto } from '@models/image-dto.model';
import { ContentBlockDto } from './content-block-dto.model';

export interface ContentBlockImageDto extends ContentBlockDto {
  image: ImageDto;
}
