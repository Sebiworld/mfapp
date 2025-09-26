import { MFApi } from "@api/axios/mfApi";
import { useMemo, useState } from "react";

import React from "react";
import { ContentFilesItemProps } from "./ContentFilesItem";
import { getMimetypeForExtension } from "@utils/functions/mimetype/getMimetypeForExtension";
import { ContentFilesAudioplayerSecure } from "./ContentFilesAudioplayerSecure";

export const ContentFilesAudioplayer: React.FC<ContentFilesItemProps> = ({
  file,
}) => {
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

  if (!file?.basename) {
    return;
  }

  if (!mimetype?.startsWith("audio")) {
    return;
  }

  if (hasError) {
    return <ContentFilesAudioplayerSecure file={file} />;
  }

  return (
    <audio
      controls
      title={file.basename}
      className="audio-player"
      onLoad={() => {
        setHasError(false);
      }}
      onError={() => {
        setHasError(true);
      }}
    >
      <source src={url} type={mimetype} />
    </audio>
  );
};
