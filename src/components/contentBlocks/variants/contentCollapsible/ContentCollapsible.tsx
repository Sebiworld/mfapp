import { ContentBlockCollapsibleDto } from "@models/content/content-block-collapsible-dto.model";
import { Box } from "@mui/material";
import React, { useMemo } from "react";
import { isValidArray } from "@utils/functions/isValidArray";
import { ContentCollapsibleItem } from "./components/ContentCollapsibleItem";

export interface ContentCollapsibleProps {
  block: ContentBlockCollapsibleDto;
}

export const ContentCollapsible: React.FC<ContentCollapsibleProps> = ({
  block,
}) => {
  const classes: string = useMemo(() => {
    if (!block?.id) {
      return "";
    }

    const output: string[] = [
      "content-block",
      "layout-block",
      "content-collapsible",
      `block-depth-${block.depth}`,
    ];

    if (block.classes && typeof block.classes === "string") {
      output.push(...block.classes.split(" "));
    }

    return output.join(" ");
  }, [block]);

  if (!isValidArray(block.items) || !block.items.length) {
    return null;
  }

  return (
    <Box className={classes}>
      {block.items.map((item) => (
        <ContentCollapsibleItem key={item.id} item={item} />
      ))}
    </Box>
  );
};
