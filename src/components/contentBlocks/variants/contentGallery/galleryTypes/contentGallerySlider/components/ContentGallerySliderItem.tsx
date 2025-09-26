import React from "react";
import { register } from "swiper/element/bundle";
import { ImageDto } from "@models/image-dto.model";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { ContentGallerySliderItemButton } from "./ContentGallerySliderItemButton";

// Import Swiper styles
import "swiper/css/bundle";
import { SwiperSlideElement } from "@utils/components/SwiperSlideElement";

// Register Swiper custom elements
register();

// Define custom element interface
interface SwiperSlideProps extends React.HTMLAttributes<HTMLElement> {
  lazy?: boolean | "true" | "false";
}

declare module "react" {
  interface JSX {
    IntrinsicElements: {
      "swiper-slide": SwiperSlideProps;
    };
  }
}

export interface ContentGallerySliderItemProps {
  image: ImageDto;
  detailLink?: string;
  onClick?: () => void;
}

export const ContentGallerySliderItem: React.FC<
  ContentGallerySliderItemProps
> = ({ image, detailLink, onClick }) => {
  return (
    <SwiperSlideElement lazy="true">
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
    </SwiperSlideElement>
  );
};
