import React from "react";
import { ContentText } from "./variants/ContentText";
import { ContentBlockTextDto } from "@models/content/content-block-text-dto.model";
import { ContentBlockDtoVariant } from "@models/content/content-block-dto-variant.model";
import { ContentForm } from "./variants/contentForm/ContentForm";
import { ContentBlockFormDto } from "@models/content/content-block-form-dto.model";
import { ContentBlockYoutubeVideoDto } from "@models/content/content-block-youtube-video-dto.model";
import { ContentYoutubeVideo } from "./variants/contentYoutubeVideo/ContentYoutubeVideo";
import { ContentBlockGalleryDto } from "@models/content/content-block-gallery-dto.model";
import { ContentGallery } from "./variants/contentGallery/ContentGallery";
import { ContentImage } from "./variants/ContentImage";
import { ContentBlockImageDto } from "@models/content/content-block-image-dto.model";

export interface ContentBlocksProps {
  block: ContentBlockDtoVariant;
}

export const ContentBlock: React.FC<ContentBlocksProps> = ({ block }) => {
  // console.log('CONTENT BLOCK', block.type, block)

  if (block.type === "text") {
    return (
      <ContentText
        key={block.id}
        block={block as ContentBlockTextDto}
      ></ContentText>
    );
  }

  if (block.type === "image") {
    return (
      <ContentImage
        key={block.id}
        block={block as ContentBlockImageDto}
      ></ContentImage>
    );
  }

  if (block.type === "gallery") {
    return (
      <ContentGallery
        key={block.id}
        block={block as ContentBlockGalleryDto}
      ></ContentGallery>
    );
  }

  if (block.type === "form") {
    return (
      <ContentForm
        key={block.id}
        block={block as ContentBlockFormDto}
      ></ContentForm>
    );
  }

  if (block.type === "youtube-video") {
    return (
      <ContentYoutubeVideo
        key={block.id}
        block={block as ContentBlockYoutubeVideoDto}
      ></ContentYoutubeVideo>
    );
  }

  return <>TODO: {block.type}</>;
};
