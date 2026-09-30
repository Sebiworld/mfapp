import { expect, test } from "@playwright/test";

test("seed content page renders title, section and text block", async ({
  page,
}) => {
  await page.goto("/test-fixture-content");

  await expect(
    page.getByRole("heading", { name: "Test Fixture Content" })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Test Fixture Section" })
  ).toBeVisible();
  await expect(
    page.locator("section").getByText("Test fixture text.")
  ).toBeVisible();
});

test("unknown path shows the not-found view", async ({ page }) => {
  await page.goto("/test-fixture-does-not-exist");

  await expect(
    page.locator(".error-card").getByText("Seite nicht gefunden (404)")
  ).toBeVisible();
});

test("seed project role page lists its cast", async ({ page }) => {
  await page.goto("/projekte/test-fixture-project/rollen/test-fixture-role-1");

  await expect(
    page.getByRole("heading", { name: "Test Fixture Role 1" })
  ).toBeVisible();
  await expect(page.getByText("Test Portrait 1").first()).toBeVisible();
  await expect(page.getByText("Test Portrait 2").first()).toBeVisible();
});
