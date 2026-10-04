import { describe, expect, it } from "vitest";
import { getMimetypeForExtension } from "../getMimetypeForExtension";

describe("getMimetypeForExtension", () => {
  it.each([
    ["jpg", "image/jpeg"],
    ["jpeg", "image/jpeg"],
    ["png", "image/png"],
    ["gif", "image/gif"],
    ["webp", "image/webp"],
    ["svg", "image/svg+xml"],
    ["avif", "image/avif"],
    ["mp3", "audio/mp3"],
    ["m4a", "audio/mp4"],
    ["aac", "audio/aac"],
    ["wav", "audio/wav"],
    ["ogg", "audio/ogg"],
    ["oga", "audio/ogg"],
    ["opus", "audio/ogg"],
    ["flac", "audio/x-flac"],
    ["weba", "audio/webm"],
    ["aif", "audio/x-aiff"],
    ["aiff", "audio/x-aiff"],
    ["caf", "audio/x-caf"],
    ["mp4a", "audio/mp4"],
    ["spx", "audio/ogg"],
  ])("maps the extension %s to %s", (extension, mimetype) => {
    expect(getMimetypeForExtension(extension)).toBe(mimetype);
  });

  it("uses the last part of a file name", () => {
    expect(getMimetypeForExtension("cast.photo.final.png")).toBe("image/png");
    expect(getMimetypeForExtension("song.mp3")).toBe("audio/mp3");
  });

  it.each([
    "pdf",
    "docx",
    "xyz",
    "",
    "JPG",
    "toString",
    "__proto__",
    "noextension.",
  ])("returns undefined for the unknown or empty extension %j", (extension) => {
    expect(getMimetypeForExtension(extension)).toBeUndefined();
  });

  it("returns undefined without a file name", () => {
    expect(getMimetypeForExtension(undefined)).toBeUndefined();
    expect(getMimetypeForExtension(null as unknown as string)).toBeUndefined();
  });

  it("does not offer the audio player for files that are not audio", () => {
    for (const extension of ["pdf", "mp4", "zip", "docx"]) {
      expect(getMimetypeForExtension(extension) ?? "").not.toMatch(/^audio/);
    }
  });
});
