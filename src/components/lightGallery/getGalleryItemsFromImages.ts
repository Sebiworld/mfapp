import { MFApi } from "@api/mfApi";
import { getImageVariantUrls } from "@components/lazyPicture/getImageVariantUrls";
import { ImageDto } from "@models/image-dto.model";
import { isValidArray } from "@utils/functions/isValidArray";
import { getMimetypeForExtension } from "@utils/functions/mimetype/getMimetypeForExtension";
import { GalleryItem } from "lightgallery/lg-utils";

export const getGalleryItemsFromImages = (
  images: ImageDto[]
): GalleryItem[] | undefined => {
  if (!isValidArray(images) || !images.length) {
    return undefined;
  }

  return images.map((image) => {
    const output: GalleryItem = {
      id: `${image.page_id}#${image.basename}`,
    };

    if (image.width && image.height) {
      output.size = `${image.width}#${image.height}`;
      output.width = `${image.width}`;
      output.height = `${image.height}`;
    }

    if (image.description) {
      output.title = image.description;
      output.alt = image.description;
    }

    if (image.caption) {
      output.subHtml = image.caption;
    }

    const fileUrl = MFApi.getFileByIdUrl(image.page_id, {
      file: image.basename,
    });
    output.src = fileUrl;
    output.downloadUrl = fileUrl;

    const imageUrls = getImageVariantUrls(image, {
      thumb: { height: 300 },
      webp500px1x: { width: 500, webp: true },
      webp500px2x: { width: 1000, webp: true },
      normal500px1x: { width: 500 },
      normal500px2x: { width: 1000 },
      webp800px1x: { width: 800, webp: true },
      webp800px2x: { width: 1600, webp: true },
      normal800px1x: { width: 800 },
      normal800px2x: { width: 1600 },
      webp1x: { width: 1200, webp: true },
      webp2x: { width: 2400, webp: true },
      normal1x: { width: 1200 },
      normal2x: { width: 2400 },
    });

    output.thumb = imageUrls.thumb;

    output.sources = [
      {
        media: "(max-width: 500px)",
        srcset: `${imageUrls.webp500px1x} 1x, ${imageUrls.webp500px2x} 2x`,
        type: "image/webp",
      },
      {
        media: "(max-width: 500px)",
        srcset: `${imageUrls.normal500px1x} 1x, ${imageUrls.normal500px2x} 2x`,
        type: getMimetypeForExtension(image.ext),
      },
      {
        media: "(max-width: 800px)",
        srcset: `${imageUrls.webp800px1x} 1x, ${imageUrls.webp800px2x} 2x`,
        type: "image/webp",
      },
      {
        media: "(max-width: 800px)",
        srcset: `${imageUrls.normal800px1x} 1x, ${imageUrls.normal800px2x} 2x`,
        type: getMimetypeForExtension(image.ext),
      },
      {
        srcset: `${imageUrls.webp1x} 1x, ${imageUrls.webp2x} 2x`,
        type: "image/webp",
      },
      {
        srcset: `${imageUrls.normal1x} 1x, ${imageUrls.normal2x} 2x`,
        type: getMimetypeForExtension(image.ext),
      },
    ];

    return output;
  });
};
