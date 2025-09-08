import React from "react";
import { ImageDto } from "@models/image-dto.model";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";

// Import Swiper styles
import "swiper/css/bundle";

import { ContentGallerySliderItemButton } from "./ContentGallerySliderItemButton";

export interface ContentGallerySliderItemProps {
  image: ImageDto;
  detailLink?: string;
  onClick?: () => void;
}

export const ContentGallerySliderItem: React.FC<
  ContentGallerySliderItemProps
> = ({ image, detailLink, onClick }) => {
  return (
    <swiper-slide lazy="true">
      <ContentGallerySliderItemButton detailLink={detailLink} onClick={onClick}>
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
    </swiper-slide>
  );
};
