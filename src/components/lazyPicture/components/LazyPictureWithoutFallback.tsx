import { ImageDto } from "@models/image-dto.model";
import { ComponentPropsWithoutRef, useMemo, useState } from "react";
import { Box } from "@mui/material";
import React from "react";
import { getMimetypeForExtension } from "@utils/functions/mimetype/getMimetypeForExtension";
import { isValidArray } from "@utils/functions/isValidArray";
import { uniqBy } from "lodash";
import { lazyPictureWithoutFallbackStyles } from "./lazyPictureWithoutFallback.styles";
import { mediaPlaceholders } from "../mediaPlaceholders";
import { LazyPictureSecureWithoutFallback } from "./LazyPictureSecureWithoutFallback";
import { getImageFileUrl } from "../getImageFileUrl";
import { capImageSize } from "../capImageSize";

export interface LazyPictureSize {
  media?: string;
  width?: number;
  height?: number;
}

export interface LazyPictureWithoutFallbackProps {
  image?: ImageDto;
  pictureProps?: Partial<
    ComponentPropsWithoutRef<"picture"> & { [key: string]: unknown }
  >;
  imageProps?: Partial<
    ComponentPropsWithoutRef<"img"> & { [key: string]: unknown }
  >;
  sizes?: LazyPictureSize[];
  defaultSize?: LazyPictureSize;
  className?: string;
  children?: React.ReactNode;
}

export const LazyPictureWithoutFallback: React.FC<
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
  const [hasError, setHasError] = useState(false);

  const sources = useMemo(() => {
    if (
      !image?.basename ||
      !sizes ||
      !isValidArray(sizes) ||
      image.ext === "svg"
    ) {
      return;
    }

    return uniqBy(sizes, "media").map((size) => {
      const size1x = capImageSize(image, size, 1);
      const size2x = capImageSize(image, size, 2);
      const has2x =
        size2x.width !== size1x.width || size2x.height !== size1x.height;

      const urlWebp = getImageFileUrl(image, { ...size1x, webp: true });
      const urlWebp2x = getImageFileUrl(image, { ...size2x, webp: true });
      const url = getImageFileUrl(image, size1x);
      const url2x = getImageFileUrl(image, size2x);

      const media = size.media
        ? mediaPlaceholders[size.media] ?? size.media
        : undefined;

      return (
        <React.Fragment key={size.media || "default"}>
          <source
            media={media}
            srcSet={has2x ? `${urlWebp} 1x, ${urlWebp2x} 2x` : urlWebp}
            type="image/webp"
          />
          <source
            media={media}
            srcSet={has2x ? `${url} 1x, ${url2x} 2x` : url}
            type={getMimetypeForExtension(image.ext)}
          />
        </React.Fragment>
      );
    });
  }, [image, sizes]);

  const fileUrl = useMemo((): string | undefined => {
    if (!image?.basename) {
      return;
    }

    const sizeWithoutMedia = sizes?.find((size) => !size.media);

    const width = defaultSize ? defaultSize?.width : sizeWithoutMedia?.width;
    const height = defaultSize ? defaultSize?.height : sizeWithoutMedia?.height;

    return getImageFileUrl(image, {
      ...capImageSize(image, { width, height }, 1),
    });
  }, [defaultSize, image, sizes]);

  if (!image?.basename) {
    return;
  }

  if (hasError && image?.secure) {
    return (
      <LazyPictureSecureWithoutFallback
        image={image}
        pictureProps={pictureProps}
        imageProps={imageProps}
        sizes={sizes}
        defaultSize={defaultSize}
        className={className}
        children={children}
      />
    );
  }

  return (
    <Box
      component="picture"
      className={className}
      {...pictureProps}
      sx={lazyPictureWithoutFallbackStyles}
    >
      {sources}
      {children}

      <img
        alt={image.description ?? ""}
        src={fileUrl}
        width={image.width}
        height={image.height}
        loading="lazy"
        onLoad={() => {
          setHasError(false);
        }}
        onError={() => {
          setHasError(true);
        }}
        {...imageProps}
      />
    </Box>
  );
};
