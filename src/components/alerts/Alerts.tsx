import React from "react";

import { Box } from "@mui/material";
import { isValidArray } from "@utils/functions/isValidArray";
import { AlertDto } from "@models/utility-types/alert-dto.model.ts";
import { alertsStyles } from "./alerts.styles";

export interface AlertProps {
  alerts: AlertDto[];
}

export const Alert: React.FC<AlertProps> = ({ alerts }) => {
  if (!isValidArray(alerts) || !alerts.length) {
    return null;
  }

  return <Box className="alerts-container" sx={alertsStyles}></Box>;
};
