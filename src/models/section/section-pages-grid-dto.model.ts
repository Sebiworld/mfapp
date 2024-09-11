
import { ImageDto } from "@models/image-dto.model";
import { SectionDto } from "./section-dto.model";
import { GalleryTypeDto } from "@models/utility-types/gallery-type-dto.model";

export interface SectionPagesGridPageDto {
  id: number;
  title: string;
  image?: ImageDto;
  has_detailsview?: boolean;
  description?: string;
  color?: string;
}

export interface SectionPagesGridDto extends SectionDto {
  type: 'pages-grid';
  pages: SectionPagesGridPageDto[];
  image_ratio?: string,
  image_factor?: number,
  gallery_type?: GalleryTypeDto
}