import { ImageDto } from "@models/image-dto.model";

export type ConfigurationDto = {
  [key: string]: unknown;
  maintenance_mode?: boolean;
  disable_login?: boolean;
  disable_registration?: boolean;
  main_image?: ImageDto;
  logo_square?: ImageDto;
  placeholder_images?: ImageDto[];
  site_name?: string;
  author?: string;
  seo_title?: string;
  seo_description?: string;
  hash?: string;
};
