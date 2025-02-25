import { ContentBlockYoutubeVideoDto } from "@models/content/content-block-youtube-video-dto.model";
import { Box } from "@mui/material";
import React from "react";
import ReactPlayer from "react-player";
import { contentYoutubeVideoStyles } from "./contentYoutubeVideo.styles";
import { VideoPlaceholder } from "./components/VideoPlaceholder";

export interface ContentYoutubeVideoProps {
  block: ContentBlockYoutubeVideoDto;
}

export const ContentYoutubeVideo: React.FC<ContentYoutubeVideoProps> = ({
  block,
}) => {
  if (!block.video_id) {
    return null;
  }

  return (
    <Box
      className={`content-block content-youtube-video ${block.classes}`}
      sx={contentYoutubeVideoStyles}
    >
      <Box className="player-wrapper">
        <ReactPlayer
          className="react-player"
          width="100%"
          height="100%"
          url={`https://www.youtube.com/watch?v=${block.video_id}`}
          light={
            <VideoPlaceholder
              image={block.placeholder_image}
              title={block.title}
            ></VideoPlaceholder>
          }
        />
      </Box>
    </Box>
  );
};
