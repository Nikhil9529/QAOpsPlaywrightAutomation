import {expect, test} from "@playwright/test";

test('@Web Search the Products in Amazon', async ({page}) =>
{
  await page.goto("https://www.amazon.in/", { waitUntil: 'domcontentloaded' });
  const searchBox = page.getByPlaceholder("Search Amazon");
  await expect(searchBox).toBeVisible({ timeout: 20000 });
  await searchBox.fill("Yoga Mat");
  await searchBox.press("Enter");
  const resultLink = page.locator(".a-size-base-plus.a-spacing-none.a-color-base.a-text-normal").first();
  await expect(resultLink).toBeVisible({ timeout: 25000 });
  await resultLink.click();

});