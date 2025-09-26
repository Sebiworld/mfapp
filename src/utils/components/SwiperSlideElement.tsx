interface SwiperSlideElementProps {
  lazy?: boolean | string;
  "data-background"?: string;
  "data-swiper-autoplay"?: string | number;
}

export const SwiperSlideElement: React.FC<
  React.HTMLAttributes<HTMLElement> & SwiperSlideElementProps
> = (props) => <div {...props} />;
