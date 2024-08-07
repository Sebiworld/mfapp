import { ContentBlockTextDto } from '@models/content/content-block-text-dto.model';
import { Box } from '@mui/joy';
import React from 'react';

export interface ContentTextProps {
  block: ContentBlockTextDto;
}

export const ContentText: React.FC<ContentTextProps> = ({ block }) => {
  return <Box className={`content-block ${block.classes}`} dangerouslySetInnerHTML={{ __html: block.text }}></Box>;
};
