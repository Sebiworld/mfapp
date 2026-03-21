import { Box, Typography } from "@mui/material";
import React from "react";
import { LazyPicture } from "@components/lazyPicture/LazyPicture";
import { ImageDto } from "@models/image-dto.model";

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
        <LazyPicture image={image} />
      ) : (
        <img src="img/mf-bg.jpg" loading="lazy" />
      )}
    </Box>
  );
};
