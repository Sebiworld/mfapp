import { ImageDto } from "@models/image-dto.model";
import { ContentBlockDto } from "./content-block-dto.model";

export interface ContentBlockYoutubeVideoDto extends ContentBlockDto {
  type: "youtube-video";
  title: string;
  hide_title: boolean;
  video_id: string;
  placeholder_image?: ImageDto;
}
