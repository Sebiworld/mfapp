import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { FileDto } from "@models/file-dto.model";
import { i18n } from "@utils/i18n/i18n";
import { ContentFilesItem } from "../components/ContentFilesItem";

const FILE = {
  created: 1,
  modified: 1,
  description: "Probenplan",
  ext: "pdf",
  filesize: 2048,
  filesizeStr: "2 kB",
  name: "probenplan.pdf",
  basename: "probenplan.pdf",
  page_id: 4711,
  http_url: "/site/assets/files/4711/probenplan.pdf",
} as FileDto;

describe("ContentFilesItem", () => {
  it("shows translated actions, no raw translation keys", () => {
    const { container } = render(<ContentFilesItem file={FILE} />);

    expect(screen.getByRole("button", { name: "Herunterladen" })).toBeVisible();
    expect(container.textContent).not.toMatch(/general\./);
    expect(container.querySelector('[title^="general."]')).toBeNull();
  });

  it("has a text for every file action", () => {
    for (const key of ["general.actions.open", "general.actions.download"]) {
      expect(i18n.exists(key)).toBe(true);
    }
  });
});
