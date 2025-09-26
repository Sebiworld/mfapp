import { Ref } from "react";
import { SwiperContainer } from "swiper/element";

interface SwiperContainerElementProps {
  navigation?: boolean | string;
  pagination?: boolean | string;
  scrollbar?: boolean | string;
  init?: boolean | string;
  "slides-per-view"?: number | string;
  "space-between"?: number | string;
  autoplay?: boolean | string;
  loop?: boolean | string;
  zoom?: boolean | string;
  lazy?: boolean | string;
  effect?: string;
}

export const SwiperContainerElement = (
  props: React.HTMLAttributes<HTMLDivElement> &
    SwiperContainerElementProps & { ref?: Ref<SwiperContainer> }
) => {
  const { ref, ...rest } = props;
  return <div ref={ref as unknown as Ref<HTMLDivElement>} {...rest} />;
};
