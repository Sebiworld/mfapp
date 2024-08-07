
import { ImageDto } from '@models/image-dto.model';
import { ContentBlockDto } from './content-block-dto.model';

export interface ContentBlockGalleryDto extends ContentBlockDto {
  title: string;
  hide_title: boolean;
  gallery_type: {
    id: number;
    title: string;
    value: string;
  }[];
  images: ImageDto[];
  description: string;
  text: string;
}
