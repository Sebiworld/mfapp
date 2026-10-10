import { ImageDto } from "@models/image-dto.model";
import React, { ComponentPropsWithoutRef, useMemo } from "react";
import { Box } from "@mui/material";
import { lazyPictureStyles } from "./lazyPicture.styles";
import {
  LazyPictureWithoutFallback,
  LazyPictureWithoutFallbackProps,
} from "./components/LazyPictureWithoutFallback";
import { lazyPictureWithoutFallbackStyles } from "./components/lazyPictureWithoutFallback.styles";

const DEFAULT_PLACEHOLDER = "/img/mf-bg.jpg";

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

    // The placeholder gets the same figure and picture shell as a real image, so the same width rules apply.
    return (
      <Box
        component="figure"
        className={classes}
        sx={lazyPictureStyles}
        {...figureProps}
      >
        {placeholder &&
        typeof placeholder !== "string" &&
        placeholder.basename ? (
          <LazyPictureWithoutFallback image={placeholder} />
        ) : (
          <Box component="picture" sx={lazyPictureWithoutFallbackStyles}>
            <img
              src={
                typeof placeholder === "string"
                  ? placeholder
                  : DEFAULT_PLACEHOLDER
              }
              alt=""
              loading="lazy"
            />
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box
      component="figure"
      className={classes}
      sx={lazyPictureStyles}
      {...figureProps}
    >
      <LazyPictureWithoutFallback image={image} {...props} />

      {image?.caption && (
        <Box component="figcaption" className="image-caption">
          {image.caption}
        </Box>
      )}
    </Box>
  );
};
