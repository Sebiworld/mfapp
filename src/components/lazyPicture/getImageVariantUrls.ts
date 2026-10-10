import { getImageFileUrl } from "./getImageFileUrl";
import { ImageDto } from "@models/image-dto.model";

/**
 * Builds the file URLs of several scaled variants of an image.
 * @param image Image object as delivered by the API.
 * @param variants Parameters per variant name.
 * @param unlockKey Key of the password protected page the image belongs to, if any.
 * @returns URL per variant name; empty without page id or file name.
 */
export const getImageVariantUrls = (
  image: ImageDto,
  variants: {
    [key: string]: {
      [key: string]: unknown;
    };
  },
  unlockKey?: string
): { [key: string]: string } => {
  const urls: { [key: string]: string } = {};

  if (!image?.page_id || !image?.basename) {
    return urls;
  }

  for (const [variantName, variantParams] of Object.entries(variants)) {
    const url = getImageFileUrl(image, variantParams, unlockKey);

    if (!url) {
      continue;
    }

    urls[variantName] = url;
  }

  return urls;
};
