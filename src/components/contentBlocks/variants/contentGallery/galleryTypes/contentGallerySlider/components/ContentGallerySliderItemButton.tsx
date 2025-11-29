import { Button } from "@mui/material";
import React, { ComponentProps } from "react";

// Import Swiper styles
import "swiper/css/bundle";

export interface ContentGallerySliderItemButtonProps
  extends ComponentProps<typeof Button> {
  detailLink?: string;
}

export const ContentGallerySliderItemButton: React.FC<
  ContentGallerySliderItemButtonProps
> = ({ detailLink, onClick, children, ...props }) => {
  if (detailLink) {
    return (
      <Button className="gallery-link" href={detailLink} {...props}>
        {children}
      </Button>
    );
  }

  if (onClick) {
    return (
      <Button className="image-button" onClick={onClick} {...props}>
        {children}
      </Button>
    );
  }

  return null;
};
