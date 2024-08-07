import { ImageDto } from "../image-dto.model";
import { PageDto } from "./page-dto-model";
import { ProjectPageDto } from "./project-page-dto.model";

export interface PageCardDto extends PageDto {
  main_image?: ImageDto;
  intro: string;
  datetime_from: number;
  project?: ProjectPageDto;
  external_type: string;
  external_link?: string;
}
