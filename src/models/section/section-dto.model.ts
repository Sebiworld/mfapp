
import { ContentBlockDtoVariant } from "@models/content/content-block-dto-variant.model";
import { ImageDto } from "@models/image-dto.model";
import { PageDto } from "@models/page/page-dto-model";

export interface SectionDto {
  type: string;
  id: string;
  section_name: string;
  title: string;
  hide_title: boolean;
  highlight: boolean;
  classes: string;
  title_index: number;
  reference?: PageDto;
  reference_label?: string;
  contents: ContentBlockDtoVariant[];
  main_image?: ImageDto;
  main_image_dark?: ImageDto;
  background_image?: ImageDto;
  background_image_dark?: ImageDto;
}
