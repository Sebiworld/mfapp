import { PageCardDto } from "./page-card-dto.model";
import { PageDto } from "./page-dto.model";

export interface ListContainerPageDto extends PageDto {
  items: PageCardDto[];

  lastElementIndex?: number;
  totalNumber?: number;
  moreAvailable?: boolean;
}
