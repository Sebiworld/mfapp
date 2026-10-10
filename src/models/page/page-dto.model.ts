import { BasicPageDto } from "@models/basic-page-dto.model";
import { AlertDto } from "@models/utility-types/alert-dto.model";
import { BreadcrumbDto } from "@models/utility-types/breadcrumb-dto.model";
import { SeoDto } from "@models/utility-types/seo-dto.model";

export interface PageDto extends BasicPageDto {
  alerts?: AlertDto[];
  breadcrumbs?: BreadcrumbDto[];
  seo?: SeoDto;

  /**
   * `true`: the page is password protected and was delivered without its content (only title, breadcrumbs, seo).
   * Missing in responses stored before the field existed.
   */
  locked?: boolean;
  /** Key that opens a password protected page (`<expires>.<signature>`); only on an opened protected page. */
  unlock_key?: string;
  /** Unix seconds until `unlock_key` is valid. */
  expires?: number;
}
