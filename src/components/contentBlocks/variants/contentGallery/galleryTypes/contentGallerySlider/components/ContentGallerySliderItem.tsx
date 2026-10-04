import { ImageDto } from "@models/image-dto.model";
import React from "react";

// Import Swiper styles
import "swiper/css/bundle";
import { ContentGallerySliderItemButton } from "./ContentGallerySliderItemButton";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { getGalleryImageLink } from "@components/contentBlocks/variants/contentGallery/galleryImageLink";

export interface ContentGallerySliderItemProps {
  index: number;
  image: ImageDto;
  openGallery?: (index: number) => void;
  /** Called when a slide that links to `detailLink` is clicked. */
  onLinkClick?: () => void;
  /** Gallery page the slide links to (opened at this image) instead of opening the lightbox. */
  detailLink?: string;
}

export const ContentGallerySliderItem: React.FC<
  ContentGallerySliderItemProps
> = ({ index, image, openGallery, onLinkClick, detailLink }) => {
  return (
    <ContentGallerySliderItemButton
      detailLink={
        detailLink ? getGalleryImageLink(detailLink, index) : undefined
      }
      onClick={() => {
        if (detailLink) {
          onLinkClick?.();
          return;
        }

        openGallery?.(index);
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
