import { ContentBlockTextDto } from "@models/content/content-block-text-dto.model";
import { Box } from "@mui/material";
import React from "react";

export interface ContentTextProps {
  block: ContentBlockTextDto;
}

export const ContentText: React.FC<ContentTextProps> = ({ block }) => {
  return (
    <Box
      className={`content-block content-text ${block.classes}`}
      dangerouslySetInnerHTML={{ __html: block.text }}
    ></Box>
  );
};
