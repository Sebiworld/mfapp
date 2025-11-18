import React from "react";

import { Box } from "@mui/material";
import { isValidArray } from "@utils/functions/isValidArray";
import { AlertDto } from "@models/utility-types/alert-dto.model.ts";
import { alertsStyles } from "./alerts.styles";
import { AlertItem } from "./AlertItem";

export interface AlertsProps {
  alerts: AlertDto[];
}

export const Alerts: React.FC<AlertsProps> = ({ alerts }) => {
  if (!isValidArray(alerts) || !alerts.length) {
    return null;
  }

  return (
    <Box className="alerts-container" sx={alertsStyles}>
      {alerts.map((alert) => (
        <AlertItem key={alert.id} alert={alert}></AlertItem>
      ))}
    </Box>
  );
};
