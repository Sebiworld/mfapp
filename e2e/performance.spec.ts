import { expect, test } from "@playwright/test";

test("performance page of the seed performance loads from the project sidebar", async ({
  page,
}) => {
  await page.goto("/projekte/test-fixture-project/");

  const link = page.locator('a[data-testid="event-item"]').first();
  await expect(link).toBeVisible();
  await link.click();

  await expect(page).toHaveURL(
    /\/projekte\/test-fixture-project\/auffuehrungen\/\d+$/
  );

  const content = page.getByTestId("performance-content");
  await expect(content).toBeVisible();
  await expect(
    content.getByRole("heading", { level: 1, name: "Test Fixture Performance" })
  ).toBeVisible();
  await expect(content.getByText("Freitag, 01.01.2100 - 19:00")).toBeVisible();
  await expect(content.getByText("Test Fixture Cast 1").first()).toBeVisible();
});

test("performance page shows the playing cast, location details and no ticket button", async ({
  page,
}) => {
  await page.goto("/projekte/test-fixture-project/");
  await page.locator('a[data-testid="event-item"]').first().click();

  const content = page.getByTestId("performance-content");
  await expect(content).toBeVisible();

  const roles = content.getByTestId("performance-roles");
  // Role 3 is tied to the playing cast and lists only its portrait; roles without cast list everyone.
  const role3Tiles = roles
    .getByTestId("project-role-portrait")
    .filter({ hasText: "Test Fixture Role 3" });
  await expect(role3Tiles).toHaveCount(1);
  await expect(role3Tiles.first()).toContainText("Test Portrait 1");
  await expect(role3Tiles.first()).not.toContainText("Test Portrait 2");

  await expect(content.getByText("Test Fixture Location")).toBeVisible();
  await expect(content.getByText("Test Street 1")).toBeVisible();
  await expect(content.getByTestId("visit-directions")).toHaveCount(0);
  await expect(content.getByTestId("visit-accessibility")).toHaveText(
    "Test accessibility info"
  );

  await expect(content.getByTestId("ticket-button")).toHaveCount(0);

  // Directions sit behind a button instead of in the page flow.
  await content.getByTestId("directions-button").click();
  await expect(page.getByTestId("visit-directions")).toHaveText(
    "Test directions"
  );
});

test("unknown performance id shows the not-found view", async ({ page }) => {
  await page.goto("/projekte/test-fixture-project/auffuehrungen/2147483000");

  await expect(
    page.locator(".error-card").getByText("Seite nicht gefunden (404)")
  ).toBeVisible();
  await expect(page.getByTestId("performance-content")).toHaveCount(0);
});
