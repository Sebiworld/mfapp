/**
 * Mime types of the file extensions the app needs one for: image sources (`<source type>`) and the audio player,
 * which only shows for `audio/*`. A full catalog would put a few hundred kilobytes into the page bundle for these.
 * The values match the former catalog lookup, so the rendered types stay the same.
 */
const MIMETYPES_BY_EXTENSION: Record<string, string> = {
  // Images
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
  avif: "image/avif",

  // Audio
  mp3: "audio/mp3",
  m4a: "audio/mp4",
  aac: "audio/aac",
  wav: "audio/wav",
  ogg: "audio/ogg",
  oga: "audio/ogg",
  opus: "audio/ogg",
  flac: "audio/x-flac",
  weba: "audio/webm",
  aif: "audio/x-aiff",
  aiff: "audio/x-aiff",
  caf: "audio/x-caf",
  mp4a: "audio/mp4",
  spx: "audio/ogg",
};

/**
 * Looks up the mime type for the extension of a file name (or a bare extension). The lookup is case-sensitive.
 * @param filename File name like `photo.jpg`, or just the extension (`jpg`).
 * @returns The mime type, or `undefined` for a missing name or an unknown extension.
 */
export const getMimetypeForExtension = (
  filename?: string
): string | undefined => {
  if (!filename || typeof filename !== "string") {
    return undefined;
  }

  const extension = filename.split(".").at(-1);

  if (!extension || !Object.hasOwn(MIMETYPES_BY_EXTENSION, extension)) {
    return undefined;
  }

  return MIMETYPES_BY_EXTENSION[extension];
};
