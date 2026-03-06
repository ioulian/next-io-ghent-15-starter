import { expect, test } from "@playwright/test";

test.describe("I18n", () => {
  test.describe("Language Switching", async () => {
    test("should switch language from English to French using <LocaleSwitcher /> and verify text on the homepage", async ({
      page,
    }) => {
      await page.goto("/");

      await expect(page.getByText("Homepage EN")).toBeVisible();

      await page.getByText("fr-BE").click();

      await expect(page.getByText("Homepage FR")).toBeVisible();
    });

    test("should switch language from English to French using URL and verify text on the homepage", async ({
      page,
    }) => {
      await page.goto("/fr-BE");

      await expect(page.getByText("Homepage FR")).toBeVisible();

      await page.goto("/fr-BE");

      await expect(page.getByText("Homepage FR")).toBeVisible();
    });
  });
});
