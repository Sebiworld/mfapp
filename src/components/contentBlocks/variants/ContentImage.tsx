import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { useLightGallery } from "@components/lightGallery/useLightGallery";
import { ContentBlockImageDto } from "@models/content/content-block-image-dto.model";
import { Box, Button } from "@mui/material";
import React, { useMemo } from "react";
import { useGalleryImageLink } from "./contentGallery/useGalleryImageLink";

export interface ContentImageProps {
  block: ContentBlockImageDto;
}

export const ContentImage: React.FC<ContentImageProps> = ({ block }) => {
  const classes: string = useMemo(() => {
    if (!block?.id) {
      return "";
    }

    const output: string[] = [
      "content-block",
      "layout-block",
      "content-image",
      `block-depth-${block.depth}`,
    ];

    if (block.classes && typeof block.classes === "string") {
      output.push(...block.classes.split(" "));
    }

    return output.join(" ");
  }, [block]);

  const image = block.image;
  const { containerRef, openIndex, onLightboxClose } = useGalleryImageLink(
    block?.id
  );
  const images = useMemo(() => [image], [image]);

  const { openGallery, element: lightGalleryElement } = useLightGallery({
    images,
    openIndex,
    onClose: onLightboxClose,
  });

  return (
    <Box ref={containerRef} className={classes}>
      {lightGalleryElement}
      <Button
        key={`${image.page_id}#${image.basename}`}
        className="image-button"
        onClick={() => {
          openGallery();
        }}
      >
        <LazyPicture
          image={image}
          sizes={[
            {
              media: "sm-down",
              width: 550,
            },
            {
              width: 800,
            },
          ]}
        />
      </Button>
    </Box>
  );
};
