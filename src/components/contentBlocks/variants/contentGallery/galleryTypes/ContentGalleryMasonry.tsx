import { Box, Button } from "@mui/material";
import React from "react";
import { ImageDto } from "@models/image-dto.model";
import Masonry from "@mui/lab/Masonry";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { useLightGallery } from "@components/lightGallery/useLightGallery";

export interface ContentGalleryMasonryProps {
  images: ImageDto[];
}

export const ContentGalleryMasonry: React.FC<ContentGalleryMasonryProps> = ({
  images,
}) => {
  const { ref: lightGalleryRef, element: lightGalleryElement } =
    useLightGallery({
      images,
    });

  return (
    <>
      {lightGalleryElement}
      <Box className={`gallery-container content-gallery-masonry`}>
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3, xl: 4, xxl: 5 }}
          spacing={2}
          columns-md={3}
        >
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
        </Masonry>
      </Box>
    </>
  );
};
