import { ContentBlockYoutubeVideoDto } from "@models/content/content-block-youtube-video-dto.model";
import { Box } from "@mui/material";
import React, { useMemo } from "react";
import ReactPlayer from "react-player";
import { contentYoutubeVideoStyles } from "./contentYoutubeVideo.styles";
import { VideoPlaceholder } from "./components/VideoPlaceholder";

export interface ContentYoutubeVideoProps {
  block: ContentBlockYoutubeVideoDto;
}

export const ContentYoutubeVideo: React.FC<ContentYoutubeVideoProps> = ({
  block,
}) => {
  const classes: string = useMemo(() => {
    if (!block?.id) {
      return "";
    }

    const output: string[] = [
      "content-block",
      "layout-block",
      "content-youtube-video",
      `block-depth-${block.depth}`,
    ];

    if (block.classes && typeof block.classes === "string") {
      output.push(...block.classes.split(" "));
    }

    return output.join(" ");
  }, [block?.classes, block?.depth, block?.id]);

  if (!block.video_id) {
    return null;
  }

  return (
    <Box className={classes} sx={contentYoutubeVideoStyles}>
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
