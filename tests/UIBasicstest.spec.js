import { test, expect } from '@playwright/test';


test('Browser Context Playwright test', async ({browser}) =>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    //await page.route('**/*.{jpg,png,jpeg}', route=> route.abort());
    const userName = page.locator("#username");
    const password = page.locator("[name='password']");
    const signInBtn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a");
    page.on('request', request=> console.log(request.url()));
    page.on('response', response=> console.log(response.url(), response.status()));
    //chrome - plugins/ cookies
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    //CSS Selectors
    await userName.fill("rahulshetty");
    await page.locator("[name='password']").fill("learning");
    await signInBtn.click();

    //Webdriver waits - Playwright waits
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');

    //Type - Fill
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await password.fill("Learning@830$3mK2");
    await signInBtn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(1).textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);
});
 
test('First Playwright test',async ({browser, page})=>
{
    await page.goto("https://google.com");
    console.log(await page.title());
    await expect(page).toHaveTitle("Google");
});