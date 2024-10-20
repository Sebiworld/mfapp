import { BasicPageDto } from "@models/basic-page-dto.model";

export interface PageDto extends BasicPageDto {
  project_id?: number;
}
