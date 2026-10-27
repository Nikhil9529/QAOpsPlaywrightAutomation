import {test, expect} from '@playwright/test';

test('Client App Login', async ({page}) =>
{
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill("Tusharpatil1@gmail.com");
    await page.locator('#userPassword').fill("Niks@1234");
    await page.locator('#login').click();
    await page.waitForLoadState('networkidle');
    const productNames = await page.locator('.card-body b').allTextContents();
    console.log(productNames);
});