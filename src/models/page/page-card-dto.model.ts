import { ImageDto } from "../image-dto.model";
import { PageDto } from "./page-dto.model";

export interface PageCardDto extends PageDto {
  main_image?: ImageDto;
  card_image?: ImageDto;
  intro?: string;
  description?: string;
  info_overlay?: string;
  datetime_from?: number;
  project_id?: number;
  details_deactivated?: boolean;
  external_type?: string;
  external_link?: string;
  images?: ImageDto[];
  hash?: string;
}
