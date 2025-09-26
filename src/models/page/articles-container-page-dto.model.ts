import { PageCardDto } from "./page-card-dto.model";
import { PageDto } from "./page-dto.model";

export interface ArticlesContainerPageDto extends PageDto {
  items: PageCardDto[];

  lastElementIndex?: number;
  totalNumber?: number;
  moreAvailable?: boolean;
}