import { MFApi } from "@api/axios/mfApi";
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
    if (!image?.basename || !sizes || !isValidArray(sizes)) {
      return;
    }

    return uniqBy(sizes, "media").map((size) => {
      const urlWebp = MFApi.getFileByIdUrl(image.page_id, {
        file: image.basename,
        width: size.width,
        height: size.height,
        webp: true,
      });
      const urlWebp2x = MFApi.getFileByIdUrl(image.page_id, {
        file: image.basename,
        width: size.width ? size.width * 2 : undefined,
        height: size.height ? size.height * 2 : undefined,
        webp: true,
      });
      const url = MFApi.getFileByIdUrl(image.page_id, {
        file: image.basename,
        width: size.width,
        height: size.height,
      });
      const url2x = MFApi.getFileByIdUrl(image.page_id, {
        file: image.basename,
        width: size.width ? size.width * 2 : undefined,
        height: size.height ? size.height * 2 : undefined,
      });

      const media = size.media
        ? mediaPlaceholders[size.media] ?? size.media
        : undefined;

      return (
        <React.Fragment key={size.media || "default"}>
          <source
            media={media}
            srcSet={`${urlWebp} 1x, ${urlWebp2x} 2x`}
            type="image/webp"
          />
          <source
            media={media}
            srcSet={`${url} 1x, ${url2x} 2x`}
            type={getMimetypeForExtension(image.ext)}
          />
        </React.Fragment>
      );
    });
  }, [image?.basename, image?.ext, image?.page_id, sizes]);

  const fileUrl = useMemo((): string | undefined => {
    if (!image?.basename) {
      return;
    }

    const sizeWithoutMedia = sizes?.find((size) => !size.media);

    const width = defaultSize ? defaultSize?.width : sizeWithoutMedia?.width;
    const height = defaultSize ? defaultSize?.height : sizeWithoutMedia?.height;

    return MFApi.getFileByIdUrl(image.page_id, {
      file: image.basename,
      width,
      height,
      // authorization: "Bearer " + accessToken,
    });
  }, [defaultSize, image?.basename, image?.page_id, sizes]);

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
        alt={image.description}
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
