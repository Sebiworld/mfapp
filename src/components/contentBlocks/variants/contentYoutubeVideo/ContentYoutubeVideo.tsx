import { ContentBlockYoutubeVideoDto } from "@models/content/content-block-youtube-video-dto.model";
import { Box } from "@mui/material";
import React, { useMemo } from "react";
import ReactPlayer from "react-player";
import { contentYoutubeVideoStyles } from "./contentYoutubeVideo.styles";
import { VideoPlaceholder } from "./components/VideoPlaceholder";
import { useGalleryImageLink } from "@components/contentBlocks/variants/contentGallery/useGalleryImageLink";

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
  }, [block]);

  // A link to the placeholder image only scrolls to the video; there is no lightbox for it.
  const { containerRef } = useGalleryImageLink(block?.id);

  if (!block.video_id) {
    return null;
  }

  return (
    <Box ref={containerRef} className={classes} sx={contentYoutubeVideoStyles}>
      <Box className="player-wrapper aspect-ratio ar-16-9">
        <Box className="player-container ar-content">
          <ReactPlayer
            className="react-player"
            width="100%"
            height="100%"
            src={`https://www.youtube.com/watch?v=${block.video_id}`}
            light={
              <VideoPlaceholder
                image={block.placeholder_image}
                title={block.title}
              ></VideoPlaceholder>
            }
          />
        </Box>
      </Box>
    </Box>
  );
};
