import React from "react";
import { ContentBlock } from "./ContentBlock";
import { contentBlocksStyles } from "./contentBlocks.styles";
import { ContentBlockDtoVariant } from "@models/content/content-block-dto-variant.model";
import { Box } from "@mui/material";

export interface ContentBlocksProps extends React.ComponentProps<typeof Box> {
  blocks?: ContentBlockDtoVariant[];
}

export const ContentBlocks: React.FC<ContentBlocksProps> = ({
  blocks,
  ...props
}) => {
  if (!blocks?.length) {
    return undefined;
  }

  const className = props.className
    ? `${props.className} content-blocks`
    : "content-blocks";

  return (
    <Box {...props} className={className} sx={contentBlocksStyles}>
      {blocks?.map((block) => (
        <ContentBlock key={block.id} block={block}></ContentBlock>
      ))}
    </Box>
  );
};
