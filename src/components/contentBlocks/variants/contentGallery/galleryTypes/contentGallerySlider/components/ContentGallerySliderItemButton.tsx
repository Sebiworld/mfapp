import { Button } from "@mui/material";
import React from "react";

// Import Swiper styles
import "swiper/css/bundle";

export interface ContentGallerySliderItemButtonProps {
  detailLink?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export const ContentGallerySliderItemButton: React.FC<
  ContentGallerySliderItemButtonProps
> = ({ detailLink, onClick, children }) => {
  if (detailLink) {
    return (
      <Button className="gallery-link" href={detailLink}>
        {children}
      </Button>
    );
  }

  if (onClick) {
    return (
      <Button className="image-button" onClick={onClick}>
        {children}
      </Button>
    );
  }

  return null;
};
