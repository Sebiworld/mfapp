import { ImageDto } from "../image-dto.model";
import { PageDto } from "./page-dto-model";

export interface PageCardDto extends PageDto {
  main_image?: ImageDto;
  intro?: string;
  description?: string;
  datetime_from?: number;
  project_id?: number;
  details_deactivated?: boolean;
  external_type?: string;
  external_link?: string;
}
