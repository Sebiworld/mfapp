import { ImageDto } from "@models/image-dto.model";
import { ContentBlockDto } from "./content-block-dto.model";

export interface ContentBlockGalleryDto extends ContentBlockDto {
  type: "gallery";
  title: string;
  hide_title: boolean;
  text?: string;
  images: ImageDto[];
  gallery_type?: string; // masonry, slider, grid
}
