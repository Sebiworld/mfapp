import { MFApi } from "@api/axios/mfApi";
import { useCallback, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import React from "react";
import { lazyPictureWithoutFallbackStyles } from "./lazyPictureWithoutFallback.styles";
import { LazyPictureWithoutFallbackProps } from "./LazyPictureWithoutFallback";

export const LazyPictureSecureWithoutFallback: React.FC<
  LazyPictureWithoutFallbackProps
> = ({
  image,
  pictureProps,
  imageProps,
  sizes,
  defaultSize,
  className,
  children,
}) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const loadBase64Image = useCallback(async (): Promise<string | undefined> => {
    if (!image?.basename) {
      return;
    }

    if (!imageRef.current) {
      return;
    }

    const sizeWithoutMedia = sizes?.find((size) => !size.media);

    const width = defaultSize ? defaultSize?.width : sizeWithoutMedia?.width;
    const height = defaultSize ? defaultSize?.height : sizeWithoutMedia?.height;

    const response = await MFApi.getFileById(
      image.page_id,
      {
        file: image.basename,
        width,
        height,
      },
      { responseType: "blob" }
    );

    // Create an object URL from the data.
    const objectUrl = URL.createObjectURL(response.data);

    // Update the source of the image.
    imageRef.current.src = objectUrl;
    imageRef.current.onload = () => URL.revokeObjectURL(objectUrl);
  }, [defaultSize, image?.basename, image?.page_id, sizes]);

  useEffect(() => {
    void loadBase64Image();
  }, [loadBase64Image]);

  if (!image?.basename) {
    return;
  }

  return (
    <Box
      component="picture"
      className={className}
      {...pictureProps}
      sx={lazyPictureWithoutFallbackStyles}
    >
      {children}

      <img
        ref={imageRef}
        alt={image.description}
        width={image.width}
        height={image.height}
        loading="lazy"
        {...imageProps}
      />
    </Box>
  );
};
