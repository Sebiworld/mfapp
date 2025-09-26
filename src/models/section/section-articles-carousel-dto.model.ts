import { PageCardDto } from "@models/page/page-card-dto.model";
import { SectionDto } from "./section-dto.model";

export interface SectionArticlesCarouselDto extends SectionDto {
  type: "articles-carousel";
  items: PageCardDto[];
  articles_page_url?: string;
}
