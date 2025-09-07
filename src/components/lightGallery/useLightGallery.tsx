import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ImageDto } from "@models/image-dto.model";
import LightGalleryElement from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import {
  AfterCloseDetail,
  AfterSlideDetail,
  InitDetail,
} from "lightgallery/lg-events";
import { LightGallery } from "lightgallery/lightgallery";
import { getGalleryItemsFromImages } from "./getGalleryItemsFromImages";

export interface UseLightGalleryProps {
  images: ImageDto[];
  onIndexChange?: (index: number) => void;
  onClose?: (index: number) => void;
}

export interface UseLightGalleryReturn {
  element?: JSX.Element;
  ref: React.MutableRefObject<LightGallery | null>;
}

export const useLightGallery = ({
  images,
  onIndexChange,
  onClose,
}: UseLightGalleryProps): UseLightGalleryReturn => {
  const lightGalleryRef = useRef<LightGallery | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const galleryItems = useMemo(
    () => getGalleryItemsFromImages(images),
    [images]
  );

  const onInit = useCallback((detail: InitDetail) => {
    if (detail) {
      lightGalleryRef.current = detail.instance;
    }
  }, []);

  const onAfterSlide = useCallback((detail: AfterSlideDetail) => {
    setActiveIndex(detail.index);
  }, []);

  const onAfterClose = useCallback(
    (detail: AfterCloseDetail) => {
      setActiveIndex(detail.instance?.index);
      if (onClose) {
        onClose(detail.instance?.index);
      }
    },
    [onClose]
  );

  useEffect(() => {
    lightGalleryRef?.current?.refresh();
  }, [galleryItems]);

  useEffect(() => {
    if (onIndexChange) {
      onIndexChange(activeIndex);
    }
  }, [activeIndex, onIndexChange]);

  const element = useMemo(
    () => (
      <LightGalleryElement
        plugins={[lgThumbnail, lgZoom]}
        licenseKey={import.meta.env.VITE_APIKEY}
        dynamic={true}
        dynamicEl={galleryItems}
        supportLegacyBrowser={false}
        onInit={onInit}
        onAfterSlide={onAfterSlide}
        onAfterClose={onAfterClose}
      ></LightGalleryElement>
    ),
    [galleryItems, onAfterClose, onAfterSlide, onInit]
  );

  return {
    element,
    ref: lightGalleryRef,
  };
};
