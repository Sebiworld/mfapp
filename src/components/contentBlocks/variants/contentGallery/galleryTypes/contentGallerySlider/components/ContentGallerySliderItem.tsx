import { ImageDto } from "@models/image-dto.model";
import React, { RefObject } from "react";

// Import Swiper styles
import "swiper/css/bundle";
import { ContentGallerySliderItemButton } from "./ContentGallerySliderItemButton";
import { LightGallery } from "lightgallery/lightgallery";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";

export interface ContentGallerySliderItemProps {
  index: number;
  image: ImageDto;
  lightGalleryRef?: RefObject<LightGallery | null>;
  onClose?: () => void;
  detailLink?: string;
}

export const ContentGallerySliderItem: React.FC<
  ContentGallerySliderItemProps
> = ({ index, image, lightGalleryRef, onClose, detailLink }) => {
  return (
    <ContentGallerySliderItemButton
      detailLink={detailLink}
      onClick={() => {
        lightGalleryRef?.current?.openGallery(index);
        if (typeof onClose === "function") {
          onClose();
        }
      }}
      title={`${image?.description || "Bild"} in Galerie öffnen`}
      sx={{
        position: "relative",
        display: "block",
        width: "auto",
        height: "auto",
      }}
    >
      <LazyPicture
        image={image}
        sizes={[
          {
            media: "(max-width: 500px)",
            width: 500,
          },
          {
            media: "(max-width: 800px)",
            width: 800,
          },
          {
            width: 1200,
          },
        ]}
      />
    </ContentGallerySliderItemButton>
  );
};
