import { BasicPageDto } from "@models/basic-page-dto.model";
import { AlertDto } from "@models/utility-types/alert-dto.model";

export interface PageDto extends BasicPageDto {
  alerts?: AlertDto[];
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
  };
}
