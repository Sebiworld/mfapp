import { SectionDto } from "./section-dto.model";
import { GalleryTypeDto } from "@models/utility-types/gallery-type-dto.model";
import { PageCardDto } from "@models/page/page-card-dto.model";

export interface SectionPagesGridDto extends SectionDto {
  type: "pages-grid";
  cards: PageCardDto[];
  image_ratio?: string;
  image_factor?: number;
  gallery_type?: GalleryTypeDto;
}
