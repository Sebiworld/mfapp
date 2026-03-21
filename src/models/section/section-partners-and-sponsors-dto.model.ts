import { SectionDto } from "./section-dto.model";
import { ImageDto } from "@models/image-dto.model";

export interface SponsorsItemDto {
  id: number;
  title?: string;
  image?: ImageDto;
}

export interface SectionPartnersAndSponsorsDto extends SectionDto {
  type: "partners-and-sponsors";
  partners?: SponsorsItemDto[];
  sponsors?: SponsorsItemDto[];
}
