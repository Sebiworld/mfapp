import { MFApi } from "@api/axios/mfApi";
import { ImageDto } from "@models/image-dto.model";

/**
 * Builds the cache token of an image file from its modification time and size.
 *
 * @param image Image object as delivered by the API.
 * @returns `<modified>.<filesize>`, or `undefined` when one of the two fields is missing.
 */
export const getImageVersion = (
  image: Pick<ImageDto, "modified" | "filesize">
): string | undefined => {
  const { modified, filesize } = image ?? {};

  if (
    typeof modified !== "number" ||
    typeof filesize !== "number" ||
    !Number.isFinite(modified) ||
    !Number.isFinite(filesize)
  ) {
    return undefined;
  }

  return `${modified}.${filesize}`;
};

/**
 * Builds the file URL of an image (or one of its scaled variants) including the cache token, so the browser can
 * keep the response until the file changes.
 *
 * @param image Image object as delivered by the API.
 * @param params Variant parameters such as `width`, `height` or `webp`.
 * @returns Absolute file URL.
 */
export const getImageFileUrl = (
  image: ImageDto,
  params: { [key: string]: unknown } = {}
): string => {
  return MFApi.getFileByIdUrl(image.page_id, {
    file: image.basename,
    ...params,
    v: getImageVersion(image),
  });
};
