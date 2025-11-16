import { ContentBlockFilesDto } from "@models/content/content-block-files-dto.model";
import { Box, List } from "@mui/material";
import React, { useMemo } from "react";
import { ContentFilesItem } from "./components/ContentFilesItem";
import { contentFilesStyles } from "./contentFiles.styles";

export interface ContentFilesProps {
  block: ContentBlockFilesDto;
}

export const ContentFiles: React.FC<ContentFilesProps> = ({ block }) => {
  const classes: string = useMemo(() => {
    if (!block?.id) {
      return "";
    }

    const output: string[] = [
      "content-block",
      "layout-block",
      "content-files",
      `block-depth-${block.depth}`,
    ];

    if (block.classes && typeof block.classes === "string") {
      output.push(...block.classes.split(" "));
    }

    return output.join(" ");
  }, [block]);

  return (
    <Box className={classes} sx={contentFilesStyles}>
      <List className="files-container">
        {block.files.map((file) => (
          <ContentFilesItem file={file} key={file.basename} />
        ))}
      </List>
    </Box>
  );
};
