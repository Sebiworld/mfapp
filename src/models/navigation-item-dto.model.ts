import { PageDto } from "./page/page-dto.model";

export interface NavigationItemDto {
  id: number;
  title?: string;
  page?: PageDto;
  section?: string;
  link?: string;
  ionicon?: string;
}
