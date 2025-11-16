import { PageDto } from "./page-dto.model";
import { ImageDto } from "@models/image-dto.model";
import { SectionDto } from "@models/section/section-dto.model";
import { ContentBlockDtoVariant } from "@models/content/content-block-dto-variant.model";
import { AuthorDto } from "@models/utility-types/author-dto.model";
import { AlertDto } from "@models/utility-types/alert-dto.model";

export interface DefaultPageDto extends PageDto {
  main_image?: ImageDto;
  intro: string;
  datetime_from: number;
  authors?: AuthorDto[];
  sections?: SectionDto[];
  contents?: ContentBlockDtoVariant[];
  subtitle?: string;
  seo?: { [key: string]: string };
  external_type: string;
  external_link?: string;
  alerts?: AlertDto[];
}
