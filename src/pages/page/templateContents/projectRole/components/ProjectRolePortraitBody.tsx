import { Box } from "@mui/material";
import { ReactElement, ReactNode } from "react";

interface ProjectRolePortraitBodyProps {
  children?: ReactNode;
}

/**
 * Body of a portrait card. Portraits have no page of their own to open yet, so the body is no click area: a ripple
 * or hover would promise an action that does not exist.
 * @param props.children Image and text of the card.
 * @returns The plain card body.
 */
export const ProjectRolePortraitBody = ({
  children,
}: ProjectRolePortraitBodyProps): ReactElement => (
  <Box className="portrait-body">{children}</Box>
);
