import { MFApi } from "@api/axios/mfApi";
import { useCallback, useEffect, useMemo, useRef } from "react";

import React from "react";
import { ContentFilesItemProps } from "./ContentFilesItem";
import { getMimetypeForExtension } from "@utils/functions/mimetype/getMimetypeForExtension";

export const ContentFilesAudioplayerSecure: React.FC<ContentFilesItemProps> = ({
  file,
}) => {
  const audioplayerRef = useRef<HTMLAudioElement>(null);

  const mimetype = useMemo(() => {
    if (file.ext) {
      return getMimetypeForExtension(file.ext.toLowerCase()) || "";
    }

    return "";
  }, [file.ext]);

  const loadBase64File = useCallback(async (): Promise<string | undefined> => {
    if (!file?.basename) {
      return;
    }

    if (!audioplayerRef.current) {
      return;
    }

    const response = await MFApi.getFileById(
      file.page_id,
      {
        file: file.basename,
      },
      { responseType: "blob" }
    );

    // Create an object URL from the data.
    const objectUrl = URL.createObjectURL(response.data);

    // Update the source of the image.
    audioplayerRef.current.src = objectUrl;
    audioplayerRef.current.onload = () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  useEffect(() => {
    void loadBase64File();
  }, [loadBase64File]);

  if (!file?.basename) {
    return;
  }

  return (
    <audio
      controls
      ref={audioplayerRef}
      title={file.basename}
      className="audio-player"
    >
      <source type={mimetype} />
    </audio>
  );
};
