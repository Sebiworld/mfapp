import { BasicPageDto } from "@models/basic-page-dto.model";
import { AlertDto } from "@models/utility-types/alert-dto.model";
import { BreadcrumbDto } from "@models/utility-types/breadcrumb-dto.model";

export interface PageDto extends BasicPageDto {
  alerts?: AlertDto[];
  breadcrumbs?: BreadcrumbDto[];
  seo?: {
    title?: string;
    description?: string;
    canonical?: string;
  };
}
