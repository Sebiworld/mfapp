import { Box } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { contentGalleryStyles } from "./contentGallery.styles";
import { ContentBlockGalleryDto } from "@models/content/content-block-gallery-dto.model";
import { ContentGallerySlider } from "./galleryTypes/ContentGallerySlider";
import { ContentGalleryGrid } from "./galleryTypes/ContentGalleryGrid";
import { ContentGalleryMasonry } from "./galleryTypes/ContentGalleryMasonry";

export interface ContentGalleryProps {
  block: ContentBlockGalleryDto;
}

export const ContentGallery: React.FC<ContentGalleryProps> = ({ block }) => {
  useEffect(() => {
    console.log("ContentGallery", block);
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
  }, [block?.gallery_type, block?.id, block?.images]);

  if (!block?.id) {
    return null;
  }

  return (
    <Box
      className={`content-block content-gallery ${block.classes}`}
      sx={contentGalleryStyles}
    >
      {gallery}
    </Box>
  );
};
