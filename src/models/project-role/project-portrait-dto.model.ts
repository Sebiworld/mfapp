import { ImageDto } from "@models/image-dto.model";

export interface ProjectPortraitDto {
  id: number;
  name: string;
  url: string;
  httpUrl: string;
  main_image?: ImageDto;
  first_name?: string;
  last_name?: string;
  title: string;
  title_separable?: string;
  intro?: string;
  user_account_ids?: number[];
  hash?: string;
}
