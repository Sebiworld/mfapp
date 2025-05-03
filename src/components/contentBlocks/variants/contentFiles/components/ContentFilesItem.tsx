import { FileDto } from "@models/file-dto.model";
import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import FolderIcon from "@mui/icons-material/Folder";
import { ContentFilesAudioplayer } from "./ContentFilesAudioplayer";
import { ContentFilesDownloadButton } from "./ContentFilesDownloadButton";

export interface ContentFilesItemProps {
  file: FileDto;
}

export const ContentFilesItem: React.FC<ContentFilesItemProps> = ({ file }) => {
  const { t } = useTranslation();

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

            <ContentFilesAudioplayer file={file} />

            <Box className="file-actions">
              <ContentFilesDownloadButton file={file} />
              {/* <Button size="small" variant="contained" color="contrast">
                {t("general.actions.open")}
              {/* <Button size="small" variant="contained" color="contrast">
                {t("general.actions.download")}
              </Button> */}
            </Box>
          </>
        }
      ></ListItemText>
    </ListItem>
  );
};
