import { ContentBlockTextDto } from "@models/content/content-block-text-dto.model";
import { Box } from "@mui/material";
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
      "content-text",
      `block-depth-${block.depth}`,
    ];

    if (block.classes && typeof block.classes === "string") {
      output.push(...block.classes.split(" "));
    }

    return output.join(" ");
  }, [block?.classes, block?.depth, block?.id]);

  return (
    <Box
      className={classes}
      dangerouslySetInnerHTML={{ __html: block.text }}
    ></Box>
  );
};
