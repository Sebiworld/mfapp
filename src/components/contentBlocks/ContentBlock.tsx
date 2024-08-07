import React from 'react';
import { ContentText } from './variants/ContentText';
import { ContentBlockTextDto } from '@models/content/content-block-text-dto.model';
import { ContentBlockDtoVariant } from '@models/content/content-block-dto-variant.model';

export interface ContentBlocksProps {
  block: ContentBlockDtoVariant;
}

export const ContentBlock: React.FC<ContentBlocksProps> = ({ block }) => {
  if (block.type === 'text') {
    return <ContentText key={block.id} block={block as ContentBlockTextDto}></ContentText>;
  }
  return <></>;
};
