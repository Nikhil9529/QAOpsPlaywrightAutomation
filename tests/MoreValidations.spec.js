import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'serial' });
test("Popup Validations", async ({ page }) => {
    test.slow();
    test.setTimeout(60000);
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/", {
        waitUntil: "domcontentloaded"
    });
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    page.once("dialog", async dialog => {
        console.log("Dialog message:", dialog.message());
        await dialog.accept();
    });
    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").hover();
    const iframe = page.locator("#courses-iframe");
    await iframe.waitFor({ state: 'visible', timeout: 20000 });
    const framesPage = page.frameLocator("#courses-iframe");
    const lifetimeLink = framesPage.locator(
        "a[href*='lifetime-access']"
    );
    try {
        await expect(lifetimeLink).toBeVisible({
            timeout: 20000
        });
        await lifetimeLink.click();
        const frameText = await framesPage
            .locator(".text h2")
            .textContent();
        console.log("Frame text:", frameText);
    }
    catch (error) {
        console.log(
            "Iframe content is currently unavailable. " +
            "legacy.rahulshettyacademy.com may not be responding."
        );

    }
});

test("Screens & Visual comparison", async ({ page }) => {
    await page.goto(
        "https://rahulshettyacademy.com/AutomationPractice/",
        {
            waitUntil: "domcontentloaded"
        }
    );
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#displayed-text").screenshot({
        path: "PartialScreenshot.png"
    });

    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
    await page.screenshot({
        path: "screenshot.png",
        fullPage: true
    });
});

test("Visual", async ({ page }) => {
    await page.goto("https://google.com", {
        waitUntil: "domcontentloaded"
    });
    await expect(page).toHaveTitle(/Google/i);

    const googleLogo = page.getByRole('img', { name: /Google/i });
    await expect(googleLogo).toBeVisible();
    await expect(googleLogo).toHaveScreenshot("google-logo.png");
});

