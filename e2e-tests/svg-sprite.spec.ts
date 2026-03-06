import { expect, test } from "@playwright/test";

const SPRITE_FILE = "sprite.svg";
const HOMEPAGE_SPRITE_NAME = "logo";
const EXPECTED_VIEWBOX = "0 0 200 200";

test.describe("SvgSprite on homepage", () => {
  test("spritesheet is loaded and logo sprite is correctly used", async ({ page }) => {
    // Wait for the spritesheet to be requested and successfully loaded (confirms file is loaded, not just HTML)
    const spriteResponsePromise = page.waitForResponse((response) => response.url().includes(SPRITE_FILE), {
      timeout: 10000,
    });

    await page.goto("/");

    const spriteResponse = await spriteResponsePromise;

    await expect(spriteResponse.status()).toBe(200);

    const body = await spriteResponse.body();
    const bodyText = body.toString("utf-8");
    expect(bodyText).toContain(`id="${HOMEPAGE_SPRITE_NAME}"`);
    expect(bodyText).toContain("<symbol ");
    expect(bodyText).toContain("</svg>");

    const svg = page
      .locator("svg")
      .filter({ has: page.locator("use") })
      .first();
    await expect(svg).toBeVisible();
    await expect(svg).toHaveAttribute("viewBox", EXPECTED_VIEWBOX);

    const use = svg.locator("use").first();
    const useHref = await use.evaluate((el) => {
      if (el instanceof SVGUseElement) {
        return el.href.baseVal;
      }
      if (el.getAttribute("href")) {
        return el.getAttribute("href");
      }
      if (el.getAttribute("xlink:href")) {
        return el.getAttribute("xlink:href");
      }

      return "";
    });
    expect(useHref).toContain(SPRITE_FILE);
    expect(useHref).toMatch(new RegExp(`#${HOMEPAGE_SPRITE_NAME}$`));
  });
});
