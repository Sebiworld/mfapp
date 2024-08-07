import { FileDto } from "@models/file-dto.model";
import { ContentBlockDto } from "./content-block-dto.model";


export interface ContentBlockLottieDto extends ContentBlockDto {
  json: FileDto;
  width?: number;
  height?: number;
}
