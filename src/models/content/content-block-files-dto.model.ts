import { ContentBlockDto } from "./content-block-dto.model";
import { FileDto } from "@models/file-dto.model";

export interface ContentBlockFilesDto extends ContentBlockDto {
  type: "files";
  title?: string;
  hide_title?: boolean;
  files: FileDto[];
}
