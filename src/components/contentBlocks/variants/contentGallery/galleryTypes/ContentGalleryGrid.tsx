import { Box } from "@mui/material";
import React from "react";
import { ImageDto } from "@models/image-dto.model";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";

export interface ContentGalleryGridProps {
  images: ImageDto[];
}

export const ContentGalleryGrid: React.FC<ContentGalleryGridProps> = ({
  images,
}) => {
  return (
    <Box className={`gallery-container content-gallery-grid`}>
      {images?.map((image) => (
        <LazyPicture key={`${image.page_id}#${image.basename}`} image={image} />
      ))}
    </Box>
  );
};
