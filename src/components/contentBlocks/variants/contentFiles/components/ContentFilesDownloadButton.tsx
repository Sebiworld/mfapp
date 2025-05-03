import { MFApi } from "@api/mfApi";
import { useCallback, useState } from "react";

import React from "react";
import { ContentFilesItemProps } from "./ContentFilesItem";
import { Button, Dialog } from "@mui/material";
import { useTranslation } from "react-i18next";
import { DownloadFileDialog } from "@utils/components/dialog/DownloadFileDialog";

export const ContentFilesDownloadButton: React.FC<ContentFilesItemProps> = ({
  file,
}) => {
  const { t } = useTranslation();
  const [fileData, setFileData] = useState<Blob | undefined>(undefined);
  const [fileDownloadProgress, setFileDownloadProgress] = useState<
    number | undefined
  >(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDownloadFile = useCallback(async () => {
    setIsDialogOpen(true);
    setFileDownloadProgress(0);

    try {
      const res = await MFApi.getFileById(
        file.page_id,
        {
          file: file.basename,
        },
        {
          responseType: "blob",
          onDownloadProgress: (progressEvent) => {
            setFileDownloadProgress(
              Math.round(
                (progressEvent.loaded / (progressEvent.total ?? 1)) * 100
              )
            );
          },
        }
      );

      const data = res.data as Blob;
      setFileData(data);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  }, [file.basename, file.page_id]);

  const handleCloseDialog = useCallback(() => {
    setIsDialogOpen(false);
    setFileData(undefined);
    setFileDownloadProgress(undefined);
  }, []);

  if (!file?.basename) {
    return;
  }

  return (
    <>
      <Button
        size="small"
        variant="contained"
        color="contrast"
        onClick={handleDownloadFile}
      >
        {t("general.actions.download")}
      </Button>

      <Dialog
        open={isDialogOpen && fileDownloadProgress !== undefined}
        onClose={handleCloseDialog}
      >
        <DownloadFileDialog
          fileData={fileData}
          filename={file.basename}
          onClose={() => setIsDialogOpen(false)}
          progress={fileDownloadProgress}
        />
      </Dialog>
    </>
  );
};
