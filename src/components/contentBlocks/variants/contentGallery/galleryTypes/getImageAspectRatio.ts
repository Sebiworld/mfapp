import { ImageDto } from "@models/image-dto.model";

/** Ratio (width / height) used for an image whose size is unknown. */
export const FALLBACK_ASPECT_RATIO = 4 / 3;

/**
 * Width-to-height ratio used to reserve an image's space before it has loaded.
 * @param image Image as delivered by the API.
 * @returns The ratio from its pixel size, else its delivered ratio, else the fallback.
 */
export const getImageAspectRatio = (image: ImageDto): number => {
  const { width, height, dimension_ratio: ratio } = image;
  if (width > 0 && height > 0) {
    return width / height;
  }
  return ratio > 0 ? ratio : FALLBACK_ASPECT_RATIO;
};
