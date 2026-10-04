import { Box, Button } from "@mui/material";
import React from "react";
import { ImageDto } from "@models/image-dto.model";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { useLightGallery } from "@components/lightGallery/useLightGallery";

export interface ContentGalleryGridProps {
  images: ImageDto[];
  /** Image to open the lightbox at without a click; `null` while there is none. */
  openIndex?: number | null;
  /** Called when the lightbox is closed. */
  onClose?: () => void;
}

export const ContentGalleryGrid: React.FC<ContentGalleryGridProps> = ({
  images,
  openIndex,
  onClose,
}) => {
  const { openGallery, element: lightGalleryElement } = useLightGallery({
    images,
    openIndex,
    onClose,
  });

  return (
    <>
      {lightGalleryElement}

      <Box className={`gallery-container content-gallery-grid`}>
        {images?.map((image, index) => (
          <Button
            key={`${image.page_id}#${image.basename}`}
            className="image-button"
            title={`${image?.description || "Bild"} in Galerie öffnen`}
            onClick={() => {
              openGallery(index);
            }}
          >
            <LazyPicture
              image={image}
              sizes={[
                {
                  media: "sm-down",
                  width: 220,
                },
                {
                  width: 310,
                },
              ]}
            />
          </Button>
        ))}
      </Box>
    </>
  );
};
