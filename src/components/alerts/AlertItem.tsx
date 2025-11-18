import React, { ReactNode, useMemo, useState } from "react";

import { Alert, AlertTitle, Box } from "@mui/material";
import { AlertDto } from "@models/utility-types/alert-dto.model.ts";
import { IonIcon } from "@ionic/react";

export interface AlertItemProps {
  alert: AlertDto;

  action?: ReactNode;
}

export const AlertItem: React.FC<AlertItemProps> = ({ alert, action }) => {
  const [isClosed, setIsClosed] = useState(false);

  const classes = useMemo(() => {
    const output = ["alert-item"];

    if (alert.classes && typeof alert.classes === "string") {
      output.push(...alert.classes.split(" "));
    }

    return output.join(" ");
  }, [alert]);

  const icon = useMemo(() => {
    if (alert.icon && alert.icon !== "no") {
      return <IonIcon aria-hidden="true" icon={alert.icon}></IonIcon>;
    }

    if (alert.icon === "no") {
      return false;
    }

    return undefined;
  }, [alert]);

  if (!alert?.id) {
    return null;
  }

  if (isClosed) {
    return null;
  }

  return (
    <Alert
      className={classes}
      variant={alert?.type || "standard"}
      severity={alert?.severity || "info"}
      color={alert?.color || "projectPrimary"}
      icon={icon}
      onClose={alert?.closable ? () => setIsClosed(true) : undefined}
      action={action}
    >
      {!!alert.title && (
        <AlertTitle
          className="alert-title"
          dangerouslySetInnerHTML={{ __html: alert.title || "" }}
        ></AlertTitle>
      )}

      {!!alert.text && (
        <Box
          className="alert-content"
          dangerouslySetInnerHTML={{ __html: alert.text || "" }}
        ></Box>
      )}
    </Alert>
  );
};
