
import { PageDto } from "./page-dto-model";
import { ImageDto } from "@models/image-dto.model";
import { SectionDto } from "@models/section/section-dto.model";
import { ProjectPageDto } from "./project-page-dto.model";
import { ContentBlockDtoVariant } from "@models/content/content-block-dto-variant.model";

export interface DefaultPageDto extends PageDto {
  main_image?: ImageDto;
  intro: string;
  datetime_from: number;
  sections?: SectionDto[];
  contents?: ContentBlockDtoVariant[];
  subtitle?: string;
  seo?: { [key: string]: string };
  project?: ProjectPageDto;
  external_type: string;
  external_link?: string;
}
