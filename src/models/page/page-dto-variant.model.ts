import { ArticlePageDto } from "./article-page-dto.model";
import { DefaultPageDto } from "./default-page-dto.model";
import { PageDto } from "./page-dto.model";

export type PageDtoVariant = PageDto | ArticlePageDto | DefaultPageDto;
