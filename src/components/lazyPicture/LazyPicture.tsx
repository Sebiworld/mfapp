import { MFApi } from "@api/mfApi";
import { ImageDto } from "@models/image-dto.model";
import { lazyPictureStyles } from "./lazyPicture.styles";
import { ComponentPropsWithoutRef, useMemo } from "react";
import { Box } from "@mui/material";
import React from "react";
import { getMimetypeForExtension } from "@utils/functions/mimetype/getMimetypeForExtension";
import { isValidArray } from "@utils/functions/isValidArray";
import { uniqBy } from "lodash";

export interface LazyPictureSize {
  media?: string;
  width?: number;
  height?: number;
}

export interface LazyPictureProps {
  image: ImageDto;
  pictureProps?: Partial<
    ComponentPropsWithoutRef<"picture"> & { [key: string]: unknown }
  >;
  imageProps?: Partial<
    ComponentPropsWithoutRef<"img"> & { [key: string]: unknown }
  >;
  sizes?: LazyPictureSize[];
  defaultSize?: LazyPictureSize;
  children?: React.ReactNode;
}

export const LazyPicture: React.FC<LazyPictureProps> = ({
  image,
  pictureProps,
  imageProps,
  sizes,
  defaultSize,
  children,
}) => {
  const sources = useMemo(() => {
    if (!sizes || !isValidArray(sizes)) {
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

      return (
        <React.Fragment key={size.media || "default"}>
          <source
            media={size.media}
            srcSet={`${urlWebp} 1x, ${urlWebp2x} 2x`}
            type="image/webp"
          />
          <source
            media={size.media}
            srcSet={`${url} 1x, ${url2x} 2x`}
            type={getMimetypeForExtension(image.ext)}
          />
        </React.Fragment>
      );
    });
  }, [image.basename, image.ext, image.page_id, sizes]);

  const fileUrl = useMemo(() => {
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
    });
  }, [defaultSize, image.basename, image.page_id, sizes]);

  if (!image?.basename) {
    return;
  }

  return (
    <Box
      component="picture"
      className="lazy-picture"
      sx={lazyPictureStyles}
      {...pictureProps}
    >
      {sources}
      {children}
      <img
        alt={image.description}
        src={fileUrl}
        width={image.width}
        height={image.height}
        loading="lazy"
        {...imageProps}
        // src="https://www.musical-fabrik.de/site/assets/files/5359/medicus-ensemble-bg.1000x500.jpg"
      />
      {/* <img alt="" src="https://www.musical-fabrik.de/site/assets/files/5359/medicus-ensemble-bg.600x0.jpg"></img> */}
    </Box>
  );
};
