import { Box, Typography } from "@mui/material";
import React from "react";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { LazyPictureSize } from "@components/lazyPicture/components/LazyPictureWithoutFallback";
import { ImageDto } from "@models/image-dto.model";

/** The player is at most 800px wide. */
const VIDEO_PLACEHOLDER_IMAGE_SIZES: LazyPictureSize[] = [
  { media: "sm-up", width: 800 },
  { width: 600 },
];

export interface VideoPlaceholderProps {
  title?: string;
  image?: ImageDto;
}

export const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({
  title,
  image,
}) => {
  return (
    <Box className="video-placeholder">
      {!!title && (
        <Box className="placeholder-title-wrapper">
          <Typography
            component="span"
            variant="h6"
            className="placeholder-title"
          >
            {title}
          </Typography>
        </Box>
      )}

      {image ? (
        <LazyPicture image={image} sizes={VIDEO_PLACEHOLDER_IMAGE_SIZES} />
      ) : (
        <img src="/img/mf-bg.jpg" loading="lazy" />
      )}
    </Box>
  );
};
