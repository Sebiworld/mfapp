import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { useLightGallery } from "@components/lightGallery/useLightGallery";
import { ContentBlockImageDto } from "@models/content/content-block-image-dto.model";
import { Box, Button } from "@mui/material";
import React, { useMemo } from "react";

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

  const { ref: lightGalleryRef, element: lightGalleryElement } =
    useLightGallery({
      images: [image],
    });

  return (
    <Box className={classes}>
      {lightGalleryElement}
      <Button
        key={`${image.page_id}#${image.basename}`}
        className="image-button"
        onClick={() => {
          lightGalleryRef?.current?.openGallery();
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
