import { Box, Button } from "@mui/material";
import React from "react";
import { ImageDto } from "@models/image-dto.model";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { useLightGallery } from "@components/lightGallery/useLightGallery";

export interface ContentGalleryGridProps {
  images: ImageDto[];
}

export const ContentGalleryGrid: React.FC<ContentGalleryGridProps> = ({
  images,
}) => {
  const { ref: lightGalleryRef, element: lightGalleryElement } =
    useLightGallery({
      images,
    });

  return (
    <>
      {lightGalleryElement}

      <Box className={`gallery-container content-gallery-grid`}>
        {images?.map((image, index) => (
          <Button
            key={`${image.page_id}#${image.basename}`}
            className="image-button"
            onClick={() => {
              lightGalleryRef?.current?.openGallery(index);
            }}
          >
            <LazyPicture image={image} />
          </Button>
        ))}
      </Box>
    </>
  );
};
