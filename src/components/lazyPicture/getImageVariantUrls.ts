import { MFApi } from "@api/axios/mfApi";
import { ImageDto } from "@models/image-dto.model";

export const getImageVariantUrls = (
  image: ImageDto,
  variants: {
    [key: string]: {
      [key: string]: unknown;
    };
  }
): { [key: string]: string } => {
  const urls: { [key: string]: string } = {};

  if (!image?.page_id || !image?.basename) {
    return urls;
  }

  for (const [variantName, variantParams] of Object.entries(variants)) {
    const url = MFApi.getFileByIdUrl(image.page_id, {
      file: image.basename,
      ...variantParams,
    });

    if (!url) {
      continue;
    }

    urls[variantName] = url;
  }

  return urls;
};
