import { ContentBlockTextDto } from "@models/content/content-block-text-dto.model";
import { Box, Typography } from "@mui/material";
import { parseHtml } from "@utils/functions/parseHtml";
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

  const title = useMemo(() => {
    if (!block.title) {
      return null;
    }

    return parseHtml(block.title);
  }, [block.title]);

  const text = useMemo(() => {
    if (!block.text) {
      return null;
    }

    return parseHtml(block.text);
  }, [block.text]);

  return (
    <Box className={classes}>
      {title && (
        <Box className="content-text-title">
          <Typography variant="h3">{title}</Typography>
        </Box>
      )}

      <Box className="content-text-inner">{text}</Box>
    </Box>
  );
};
