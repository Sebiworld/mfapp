import { mimetypes } from "./mimetypes";

export const getMimetypeForExtension = (
  filename?: string
): string | undefined => {
  if (!filename || typeof filename !== "string") {
    return undefined;
  }

  const filenameParts = filename.split(".");
  if (!filenameParts.length) {
    return undefined;
  }

  const mimetypeFound = mimetypes.find((item) =>
    item.extensions?.includes(filenameParts[filenameParts.length - 1])
  );

  return mimetypeFound?.mimetype;
};
