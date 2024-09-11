import { Box } from '@mui/joy';
import React from 'react';
import { ContentBlock } from './ContentBlock';
import { contentBlocksStyles } from './contentBlocks.styles';
import { ContentBlockTextDto } from '@models/content/content-block-text-dto.model';
import { ContentBlockDtoVariant } from '@models/content/content-block-dto-variant.model';

export interface ContentBlocksProps {
  blocks?: ContentBlockDtoVariant[];
}

export const ContentBlocks: React.FC<ContentBlocksProps> = ({ blocks }) => {
  if (!blocks?.length) {
    return undefined;
  }

  return (
    <Box className="content-blocks" sx={contentBlocksStyles}>
      {blocks?.map((block) => <ContentBlock key={block.id} block={block as ContentBlockTextDto}></ContentBlock>)}
    </Box>
  );
};
