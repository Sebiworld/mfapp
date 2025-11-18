import { ContentBlockTextDto } from "@models/content/content-block-text-dto.model";
import { Box, Typography } from "@mui/material";
import React, { useMemo } from "react";

export interface ContentTextProps {
  block: ContentBlockTextDto;
}

export const ContentText: React.FC<ContentTextProps> = ({ block }) => {
  const classes: string = useMemo(() => {
    if (!block?.id) {
      return "";
    }

    const output: string[] = [
      "content-block",
      "layout-block",
      "content-text",
      `block-depth-${block.depth}`,
    ];

    if (block.classes && typeof block.classes === "string") {
      output.push(...block.classes.split(" "));
    }

    return output.join(" ");
  }, [block]);

  return (
    <Box className={classes}>
      {block.title && (
        <Box className="content-text-title">
          <Typography
            variant="h3"
            dangerouslySetInnerHTML={{ __html: block.title }}
          ></Typography>
        </Box>
      )}

      <Box
        className="content-text-inner"
        dangerouslySetInnerHTML={{ __html: block.text }}
      ></Box>
    </Box>
  );
};
