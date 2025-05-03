import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from "@mui/material";
import { AxiosProgressEvent } from "axios";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

interface DownloadFileDialogProps {
  fileData: Blob | undefined;
  filename: string;
  progress?: number;
  onClose: () => void;
}

export const DownloadFileDialog: React.FC<DownloadFileDialogProps> = ({
  filename,
  onClose,
  fileData,
  progress,
}) => {
  const { t } = useTranslation();

  const fileDataUrl = useMemo(() => {
    if (!fileData) {
      return;
    }

    return URL.createObjectURL(fileData);
  }, [fileData]);

  useEffect(() => {
    return () => {
      if (fileDataUrl) {
        URL.revokeObjectURL(fileDataUrl);
      }
    };
  }, [fileDataUrl]);

  return (
    <>
      <DialogTitle>{filename}</DialogTitle>

      <DialogContent>
        {progress !== undefined && (
          <Box className="progress-container">
            <LinearProgress variant="determinate" value={progress} />

            <DialogContentText id="alert-dialog-slide-description">
              {t("general.download-progress", { progress })}
            </DialogContentText>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ width: "300px", maxWidth: "100%" }}>
        <Button onClick={onClose}> {t("general.actions.cancel")}</Button>

        <Button
          variant="contained"
          href={fileDataUrl || ""}
          download={filename}
          disabled={!fileDataUrl}
        >
          {t("general.actions.save")}
        </Button>
      </DialogActions>
    </>
  );
};
