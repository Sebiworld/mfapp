import { BasicPageDto } from "./basic-page-dto.model";
import { ImageDto } from "./image-dto.model";
import { PageCardDto } from "./page/page-card-dto.model";
import { PageDto } from "./page/page-dto.model";
import { IconLinkDto } from "./utility-types/icon-link-dto.model";
import { PerformanceDto } from "./utility-types/performance-dto.model";
import { SponsorDto } from "./utility-types/sponsor-dto.model";

export interface ProjectDto extends BasicPageDto {
  main_image?: ImageDto;
  logo_square?: ImageDto;
  color?: string;
  theme_vars?: { name: string; value: string }[];
  info_overlay?: string;
  short_description?: string;
}

export interface ProjectDetailsDto extends ProjectDto {
  general?: ProjectGeneralDataBlock[];
  images?: {
    galleries: PageCardDto[];
    galleries_count: number;
    galleries_page?: PageDto;
  };
  events?: ProjectEventsData;
  sharing?: IconLinkDto[];
  partners?: SponsorDto[];
  sponsors?: SponsorDto[];
}

export interface ProjectGeneralDataBlock {
  id: number;
  type: string;
  name: string;
  label: string;
  depth: number;
  value: unknown;
  rawValue: unknown;
  link?: string;
  linktitle?: string;
}

export interface ProjectImagesData {
  galleries: PageCardDto[];
  galleries_count: number;
  galleries_page?: PageDto;
}

export interface ProjectEventsData {
  performances: PerformanceDto[];
  performances_count?: number;
  ticket_page?: PageDto;
}
