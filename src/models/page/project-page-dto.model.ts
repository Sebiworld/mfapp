import { ImageDto } from "@models/image-dto.model";
import { PageDto } from "./page-dto.model";
import { AlertDto } from "@models/utility-types/alert-dto.model";

export interface ProjectPageDto extends PageDto {
  main_image?: ImageDto;
  color?: string;
  theme_vars?: { [key: string]: number | string };
  alerts?: AlertDto[];
}
