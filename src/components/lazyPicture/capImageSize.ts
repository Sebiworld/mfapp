import { ImageDto } from "@models/image-dto.model";

/**
 * Scales a requested size so that neither side exceeds the original image, keeping the aspect ratio of the request.
 *
 * @param image Image object as delivered by the API.
 * @param size Requested width and/or height at 1x.
 * @param factor Pixel density factor (1 or 2).
 * @returns Width and height to request; a side stays `undefined` when it was not requested.
 */
export const capImageSize = (
  image: Pick<ImageDto, "width" | "height">,
  size: { width?: number; height?: number },
  factor: number
): { width?: number; height?: number } => {
  let scale = factor;

  if (size.width && image.width > 0) {
    scale = Math.min(scale, image.width / size.width);
  }

  if (size.height && image.height > 0) {
    scale = Math.min(scale, image.height / size.height);
  }

  return {
    width: size.width ? Math.round(size.width * scale) : undefined,
    height: size.height ? Math.round(size.height * scale) : undefined,
  };
};
