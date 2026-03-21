import { ContentBlockCollapsibleItemDto } from "@models/content/content-block-collapsible-dto.model";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { parseHtml } from "@utils/functions/parseHtml";

export interface ContentCollapsibleProps {
  item: ContentBlockCollapsibleItemDto;
}

export const ContentCollapsibleItem: React.FC<ContentCollapsibleProps> = ({
  item,
}) => {
  const title = useMemo(() => {
    if (!item.title) {
      return null;
    }

    return parseHtml(item.title);
  }, [item.title]);

  const content = useMemo(() => {
    if (!item.content) {
      return null;
    }

    return parseHtml(item.content);
  }, [item.content]);

  return (
    <Accordion color="contrast" key={item.id}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${item.id}-content`}
        id={`${item.id}-header`}
      >
        <Typography component="span" className="accordion-title">
          {title}
        </Typography>
      </AccordionSummary>

      <AccordionDetails id={`${item.id}-content`}>{content}</AccordionDetails>
    </Accordion>
  );
};
