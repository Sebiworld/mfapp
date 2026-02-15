import { ContentBlockCollapsibleDto } from "@models/content/content-block-collapsible-dto.model";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { isValidArray } from "@utils/functions/isValidArray";
import { parseHtml } from "@utils/functions/parseHtml";

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
        <Accordion color="contrast" key={item.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${item.id}-content`}
            id={`${item.id}-header`}
          >
            <Typography component="span" className="accordion-title">
              {parseHtml(item.title || "")}
            </Typography>
          </AccordionSummary>

          <AccordionDetails id={`${item.id}-content`}>
            {parseHtml(item.content || "")}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};
