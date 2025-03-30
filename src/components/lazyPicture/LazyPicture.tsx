import { ImageDto } from "@models/image-dto.model";
import React, { ComponentPropsWithoutRef, useMemo } from "react";
import {
  LazyPictureWithoutFallback,
  LazyPictureWithoutFallbackProps,
} from "./LazyPictureWithoutFallback";
import { Box } from "@mui/material";
import { lazyPictureStyles } from "./lazyPicture.styles";

export interface LazyPictureProps extends LazyPictureWithoutFallbackProps {
  placeholder?: false | string | ImageDto;
  figureProps?: Partial<
    ComponentPropsWithoutRef<"figure"> & { [key: string]: unknown }
  >;
}

export const LazyPicture: React.FC<LazyPictureProps> = ({
  image,
  placeholder,
  figureProps,
  className,
  ...props
}) => {
  const classes = useMemo(() => {
    const output = ["lazy-picture"];
    if (className && typeof className === "string") {
      output.push(...className.split(" "));
    }
    return output.join(" ");
  }, [className]);

  if (!image?.basename) {
    if (placeholder === false) {
      return;
    }

    if (typeof placeholder === "string") {
      return <img src={placeholder} className={classes} loading="lazy" />;
    }

    if (placeholder?.basename) {
      return (
        <LazyPictureWithoutFallback className={classes} image={placeholder} />
      );
    }

    return <img src="/img/mf-bg.jpg" className={classes} loading="lazy" />;
  }

  return (
    <Box
      component="figure"
      className={classes}
      sx={lazyPictureStyles}
      {...figureProps}
    >
      <LazyPictureWithoutFallback image={image} {...props} />
      {image?.caption && <Box component="figcaption">{image.caption}</Box>}
    </Box>
  );
};
