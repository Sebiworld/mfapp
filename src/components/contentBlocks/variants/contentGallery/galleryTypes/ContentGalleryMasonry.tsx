import { Box, Button } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { ImageDto } from "@models/image-dto.model";
import Masonry from "@mui/lab/Masonry";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { useLightGallery } from "@components/lightGallery/useLightGallery";
import { getImageAspectRatio } from "./getImageAspectRatio";

export interface ContentGalleryMasonryProps {
  images: ImageDto[];
  /** Image to open the lightbox at without a click; `null` while there is none. */
  openIndex?: number | null;
  /** Called when the lightbox is closed. */
  onClose?: () => void;
}

export const ContentGalleryMasonry: React.FC<ContentGalleryMasonryProps> = ({
  images,
  openIndex,
  onClose,
}) => {
  const { t } = useTranslation();
  const { openGallery, element: lightGalleryElement } = useLightGallery({
    images,
    openIndex,
    onClose,
  });

  return (
    <>
      {lightGalleryElement}
      <Box className={`gallery-container content-gallery-masonry`}>
        <Masonry
          columns={{ xs: 1, sm: 2, md: 3, xl: 4, xxl: 5 }}
          spacing={"0px"}
          columns-md={3}
        >
          {images?.map((image, index) => (
            <Button
              key={`${image.page_id}#${image.basename}`}
              className="image-button"
              sx={{
                display: "block",
                width: "100%",
                aspectRatio: String(getImageAspectRatio(image)),
              }}
              aria-label={t(
                image.description
                  ? "gallery.open_image_described"
                  : "gallery.open_image",
                {
                  position: index + 1,
                  total: images.length,
                  description: image.description,
                }
              )}
              onClick={() => {
                openGallery(index);
              }}
            >
              <LazyPicture
                image={image}
                sizes={[
                  {
                    media: "sm-down",
                    width: 300,
                  },
                  {
                    media: "md-down",
                    width: 360,
                  },
                  {
                    width: 420,
                  },
                ]}
              />
            </Button>
          ))}
        </Masonry>
      </Box>
    </>
  );
};
