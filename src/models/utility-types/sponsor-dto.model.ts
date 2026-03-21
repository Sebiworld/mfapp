import { ImageDto } from "@models/image-dto.model";

export interface SponsorDto {
  id: number;
  title: string;
  main_image?: ImageDto;
}
