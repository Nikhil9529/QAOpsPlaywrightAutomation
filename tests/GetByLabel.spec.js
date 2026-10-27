import {text, expect, test} from '@playwright/test';

test('Playwright special locators', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("Niks@1234");
    await page.getByRole("button", {name: "submit"}).click();
    //5 seconds default timeout for expect to be visible
    await expect(page.getByText("Success! The Form has been submitted successfully!")).toBeVisible();
    await page.getByRole("Link", {name: "shop"}).click();
    await expect(page.locator(".my-4").first()).toHaveText("Shop Name");
    await page.locator("app-card").filter({hasText: "Nokia Edge"}).getByRole("button", {name: "Add"}).click();
    await page.locator("a").filter({ hasText: /checkout/i }).click();
});