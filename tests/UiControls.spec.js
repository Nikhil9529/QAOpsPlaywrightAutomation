import {expect, test} from '@playwright/test';

test('UI Controls', async ({page}) =>
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const password = page.locator("[name='password']");
    const signInBtn = page.locator("#signInBtn");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    dropdown.selectOption("consult");
    await page.locator(".radiotextsty").nth(1).click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").nth(1).isChecked());
    await expect(await page.locator(".radiotextsty").nth(1)).toBeChecked();
    //Checkbox selection
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect (await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
});

test("@Child windows handling", async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click(),
    ]);
    await expect(newPage.locator(".red")).toBeVisible({ timeout: 15000 });
    const text = await newPage.locator(".red").textContent();
    const domain = text.split("@")[1].trim().split(/\s+/)[0];
    console.log(text);
    await expect(page.locator("#username")).toBeVisible({ timeout: 15000 });
    await page.locator("#username").fill(domain);
    console.log(await page.locator("#username").inputValue());
});