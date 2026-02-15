import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router";

// Import Swiper styles
import "swiper/css/bundle";

export interface ContentGallerySliderItemButtonProps {
  detailLink?: string;
  onClick?: () => void;
  children: React.ReactNode;
  [key: string]: unknown;
}

export const ContentGallerySliderItemButton: React.FC<
  ContentGallerySliderItemButtonProps
> = ({ detailLink, onClick, children, ...props }) => {
  if (detailLink) {
    return (
      <Button
        className="gallery-link"
        component={Link}
        to={{ pathname: detailLink }}
        {...props}
      >
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
