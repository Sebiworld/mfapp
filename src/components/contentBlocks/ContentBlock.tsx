import React from "react";
import { ContentBlockTextDto } from "@models/content/content-block-text-dto.model";
import { ContentBlockDtoVariant } from "@models/content/content-block-dto-variant.model";
import { ContentBlockFormDto } from "@models/content/content-block-form-dto.model";
import { ContentBlockYoutubeVideoDto } from "@models/content/content-block-youtube-video-dto.model";
import { ContentBlockGalleryDto } from "@models/content/content-block-gallery-dto.model";
import { ContentBlockImageDto } from "@models/content/content-block-image-dto.model";
import { ContentBlockFilesDto } from "@models/content/content-block-files-dto.model";
import { ContentBlockCollapsibleDto } from "@models/content/content-block-collapsible-dto.model";

const ContentText = React.lazy(() =>
  import("./variants/ContentText").then((module) => ({
    default: module.ContentText,
  }))
);
const ContentForm = React.lazy(() =>
  import("./variants/contentForm/ContentForm").then((module) => ({
    default: module.ContentForm,
  }))
);
const ContentYoutubeVideo = React.lazy(() =>
  import("./variants/contentYoutubeVideo/ContentYoutubeVideo").then(
    (module) => ({
      default: module.ContentYoutubeVideo,
    })
  )
);
const ContentGallery = React.lazy(() =>
  import("./variants/contentGallery/ContentGallery").then((module) => ({
    default: module.ContentGallery,
  }))
);
const ContentImage = React.lazy(() =>
  import("./variants/ContentImage").then((module) => ({
    default: module.ContentImage,
  }))
);
const ContentFiles = React.lazy(() =>
  import("./variants/contentFiles/ContentFiles").then((module) => ({
    default: module.ContentFiles,
  }))
);
const ContentCollapsible = React.lazy(() =>
  import("./variants/ContentCollapsible").then((module) => ({
    default: module.ContentCollapsible,
  }))
);

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

  if (block.type === "files") {
    return (
      <ContentFiles
        key={block.id}
        block={block as ContentBlockFilesDto}
      ></ContentFiles>
    );
  }

  if (block.type === "collapsible") {
    return (
      <ContentCollapsible
        key={block.id}
        block={block as ContentBlockCollapsibleDto}
      ></ContentCollapsible>
    );
  }

  return <>TODO: {block.type}</>;
};
