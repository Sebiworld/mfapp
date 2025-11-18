import { ImageDto } from "@models/image-dto.model";
import { PageDto } from "./page-dto.model";
import { ContentBlockDtoVariant } from "@models/content/content-block-dto-variant.model";

export interface GalleryPageDto extends PageDto {
  datetime_from: number;
  main_image: ImageDto;
  intro: string;
  contents: ContentBlockDtoVariant[];
  authors: string[];
  tags: PageDto[];
  detailsLoaded: boolean;
}
