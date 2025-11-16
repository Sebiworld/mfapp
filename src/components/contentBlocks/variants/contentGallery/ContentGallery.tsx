import { Box } from "@mui/material";
import React, { useMemo } from "react";
import { contentGalleryStyles } from "./contentGallery.styles";
import { ContentBlockGalleryDto } from "@models/content/content-block-gallery-dto.model";
import { ContentGalleryGrid } from "./galleryTypes/ContentGalleryGrid";
import { ContentGalleryMasonry } from "./galleryTypes/ContentGalleryMasonry";
import { ContentGallerySlider } from "./galleryTypes/contentGallerySlider/ContentGallerySlider";

export interface ContentGalleryProps {
  block: ContentBlockGalleryDto;
}

export const ContentGallery: React.FC<ContentGalleryProps> = ({ block }) => {
  const classes: string = useMemo(() => {
    if (!block?.id) {
      return "";
    }

    const output: string[] = [
      "content-block",
      "layout-block",
      "content-gallery",
      `block-depth-${block.depth}`,
      `gallery-type-${block.gallery_type}`,
    ];

    if (block.classes && typeof block.classes === "string") {
      output.push(...block.classes.split(" "));
    }

    return output.join(" ");
  }, [block]);

  const gallery = useMemo(() => {
    if (!block?.id) {
      return null;
    }

    if (block.gallery_type === "slider") {
      return <ContentGallerySlider images={block.images} />;
    }

    if (block.gallery_type === "grid") {
      return <ContentGalleryGrid images={block.images} />;
    }

    return <ContentGalleryMasonry images={block.images} />;
  }, [block]);

  if (!block?.id) {
    return null;
  }

  return (
    <Box className={classes} sx={contentGalleryStyles}>
      {gallery}
    </Box>
  );
};
