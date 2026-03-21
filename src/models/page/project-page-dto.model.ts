import { ImageDto } from "@models/image-dto.model";
import { PageDto } from "./page-dto.model";

export interface ProjectPageDto extends PageDto {
  main_image?: ImageDto;
  color?: string;
  theme_vars?: { [key: string]: number | string };
}
