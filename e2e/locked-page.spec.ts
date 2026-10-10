import { expect, test } from "@playwright/test";
import path from "node:path";

const LOCKED_PATH = "/test-fixture-locked/";

// The password of the seeded page comes from the environment, so no fixture secret is kept in the repository.
const PASSWORD = process.env.E2E_LOCKED_PAGE_PASSWORD;
// Optional: directory for screenshots of both states.
const SCREENSHOT_DIR = process.env.E2E_SCREENSHOT_DIR;

test("locked page opens with its password and then loads its images", async ({
  page,
}) => {
  test.skip(!PASSWORD, "E2E_LOCKED_PAGE_PASSWORD is not set");

  // Status per file request; 0 for a request that failed (the browser blocks a refused image without a response).
  const fileResponses: { status: number; hasKey: boolean }[] = [];
  const recordFile = (requestUrl: string, status: number): void => {
    const url = new URL(requestUrl);

    if (url.pathname.includes("/api/file/")) {
      fileResponses.push({ status, hasKey: url.searchParams.has("unlock") });
    }
  };
  page.on("response", (response) =>
    recordFile(response.url(), response.status())
  );
  page.on("requestfailed", (request) => recordFile(request.url(), 0));

  await page.goto(LOCKED_PATH);

  await expect(
    page.getByRole("heading", { level: 1, name: "Test Fixture Locked" })
  ).toBeVisible();
  const field = page.getByLabel(/Passwort/);
  await expect(field).toBeVisible();
  await expect(page.locator(".page-content img")).toHaveCount(0);

  if (SCREENSHOT_DIR) {
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "locked-page-locked.png"),
    });
  }

  await field.fill("wrong-password");
  await field.press("Enter");
  await expect(page.getByText("Das Passwort ist falsch.")).toBeVisible();

  await field.fill(PASSWORD!);
  await field.press("Enter");

  await expect(page.getByLabel(/Passwort/)).toHaveCount(0);
  const image = page.locator(".page-content img").first();
  await expect(image).toBeVisible();
  await expect
    .poll(() =>
      // The e2e config has no DOM types; naturalWidth > 0 means the image data arrived.
      image.evaluate((img) => Number(Reflect.get(img, "naturalWidth")))
    )
    .toBeGreaterThan(0);

  // Files of the opened page are requested with the key and delivered; none is refused (a request without the key
  // would get 404 and only show the image through a fallback).
  expect(
    fileResponses.filter((response) => response.hasKey).length
  ).toBeGreaterThan(0);
  expect(fileResponses.filter((response) => response.status !== 200)).toEqual(
    []
  );

  if (SCREENSHOT_DIR) {
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, "locked-page-unlocked.png"),
    });
  }

  // The lightbox download carries the key, so Matomo's link tracking has to skip it.
  await page.locator(".page-content .image-button").first().click();
  const download = page.locator(".lg-container.lg-show .lg-download");
  await expect(download).toHaveAttribute("href", /[?&]unlock=/);
  await expect(download).toHaveClass(/\bmatomo_ignore\b/);
  await page.keyboard.press("Escape");

  // After a reload the stored key opens the page without asking again.
  await page.reload();
  await expect(page.locator(".page-content img").first()).toBeVisible();
  await expect(page.getByLabel(/Passwort/)).toHaveCount(0);
});
