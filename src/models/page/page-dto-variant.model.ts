import { ArticlePageDto } from "./article-page-dto.model";
import { ArticlesContainerPageDto } from "./articles-container-page-dto.model";
import { DefaultPageDto } from "./default-page-dto.model";
import { GalleryPageDto } from "./gallery-page-dto.model";
import { PageDto } from "./page-dto.model";

export type PageDtoVariant =
  | PageDto
  | ArticlePageDto
  | ArticlesContainerPageDto
  | GalleryPageDto
  | DefaultPageDto;
