import { ContentBlockCollapsibleDto } from "./content-block-collapsible-dto.model";
import { ContentBlockDto } from "./content-block-dto.model";
import { ContentBlockFilesDto } from "./content-block-files-dto.model";
import { ContentBlockGalleryDto } from "./content-block-gallery-dto.model";
import { ContentBlockImageDto } from "./content-block-image-dto.model";
import { ContentBlockLottieDto } from "./content-block-lottie-dto.model";
import { ContentBlockPagesDto } from "./content-block-pages-dto.model";
import { ContentBlockTextDto } from "./content-block-text-dto.model";
import { ContentBlockTimelineDto } from "./content-block-timeline-dto.model";

export type ContentBlockDtoVariant =
  | ContentBlockDto
  | ContentBlockTextDto
  | ContentBlockGalleryDto
  | ContentBlockImageDto
  | ContentBlockTimelineDto
  | ContentBlockLottieDto
  | ContentBlockPagesDto
  | ContentBlockCollapsibleDto
  | ContentBlockFilesDto;
