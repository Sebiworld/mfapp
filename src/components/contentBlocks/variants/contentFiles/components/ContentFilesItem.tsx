import { FileDto } from "@models/file-dto.model";
import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { getMimetypeForExtension } from "@utils/functions/mimetype/getMimetypeForExtension";
import React, { useMemo, useState } from "react";
import { MFApi } from "@api/mfApi";
import { ContentFilesAudioplayerSecure } from "./ContentFilesAudioplayerSecure";
import { useTranslation } from "react-i18next";
import FolderIcon from "@mui/icons-material/Folder";

export interface ContentFilesItemProps {
  file: FileDto;
}

export const ContentFilesItem: React.FC<ContentFilesItemProps> = ({ file }) => {
  const { t } = useTranslation();
  const [hasError, setHasError] = useState(false);

  const mimetype = useMemo(() => {
    if (file.ext) {
      return getMimetypeForExtension(file.ext.toLowerCase()) || "";
    }

    return "";
  }, [file.ext]);

  const url = useMemo(() => {
    if (!file?.basename) {
      return;
    }

    return MFApi.getFileByIdUrl(file.page_id, {
      file: file.basename,
    });
  }, [file.basename, file.page_id]);

  return (
    <ListItem className="file-item">
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>

      <ListItemText
        className="file-content"
        primary={file.basename}
        secondary={
          <>
            {!!file.description && (
              <Box className="text-item description">{file.description}</Box>
            )}

            {!!file.filesizeStr && (
              <Box className="text-item filesize">{file.filesizeStr}</Box>
            )}

            {mimetype.startsWith("audio") && (
              <>
                {!hasError ? (
                  <audio
                    className="audio-player"
                    title={file.basename}
                    controls
                    onLoad={() => {
                      setHasError(false);
                    }}
                    onError={(e) => {
                      setHasError(true);
                    }}
                  >
                    <source src={url} type={mimetype} />
                  </audio>
                ) : (
                  <ContentFilesAudioplayerSecure file={file} />
                )}
              </>
            )}

            <Box className="file-actions">
              <Button size="small" variant="contained" color="contrast">
                {t("general.actions.download")}
              </Button>
            </Box>
          </>
        }
      ></ListItemText>
    </ListItem>
  );
};
