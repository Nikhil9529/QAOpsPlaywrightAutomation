import {test, expect} from '@playwright/test';

test.describe.configure({ timeout: 60_000 });

const loginUrl = 'https://rahulshettyacademy.com/client/#/auth/login';

async function openRegisterPage(page) {
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });
    await page.locator('//a[normalize-space()="Register here"]').click();
    await expect(page.locator('#firstName')).toBeVisible({ timeout: 60_000 });
}

test('Click on Register here', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await openRegisterPage(page);
    await context.close();
});

test('Registering a new user', async ({ page }) => {
    await openRegisterPage(page);
    const uniqueEmail = `nikhil.wani+${Date.now()}@example.com`;
    await page.locator('#firstName').fill('Nikhil');
    await page.locator('#lastName').fill('Wani');
    await page.locator('#userEmail').fill(uniqueEmail);
    await page.locator('#userMobile').fill('1234567890');
    await page.locator('select[formcontrolname="occupation"]').selectOption('Engineer');
    await page.locator('input[type="radio"][value="Male"]').check();
    await page.locator('#userPassword').fill('Password123');
    await page.locator('#confirmPassword').fill('Password123');
    await page.locator('//input[@type="checkbox"]').check();
    await page.locator('#login').click();
    await expect(page.locator('h1.headcolor')).toHaveText('Account Created Successfully');
    console.log(await page.locator('h1.headcolor').innerText());
    await page.getByRole('button', { name: 'Login' }).click();
});

test('Login with the newly registered user', async ({ page }) => {
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });
    const uniqueEmail = `nikhil.wani+${Date.now()}@example.com`;
    await page.locator('#userEmail').fill(uniqueEmail);
    await page.locator('#userPassword').fill('Password123');
    await page.locator('#login').click();
});

test('Get product information', async ({ page }) => {
    // Ensure we are authenticated before visiting the dashboard.
    await page.goto(loginUrl, { waitUntil: 'domcontentloaded' });
    const email = process.env.TEST_EMAIL || `nikhil.wani+${Date.now()}@example.com`;
    const password = process.env.TEST_PASS || 'Password123';

    if (!process.env.TEST_EMAIL) {
        // register a new user and then log in
        await page.locator('//a[normalize-space()="Register here"]').click();
        await page.locator('#firstName').fill('Nikhil');
        await page.locator('#lastName').fill('Wani');
        await page.locator('#userEmail').fill(email);
        await page.locator('#userMobile').fill('1234567890');
        await page.locator('select[formcontrolname="occupation"]').selectOption('Engineer');
        await page.locator('input[type="radio"][value="Male"]').check();
        await page.locator('#userPassword').fill(password);
        await page.locator('#confirmPassword').fill(password);
        await page.locator('//input[@type="checkbox"]').check();
        await page.locator('#login').click();
        await expect(page.locator('h1.headcolor')).toHaveText('Account Created Successfully');
        await page.getByRole('button', { name: 'Login' }).click();
        // After account creation, ensure we actually log in with the new credentials
        await expect(page.locator('#userEmail')).toBeVisible({ timeout: 30_000 });
        await page.locator('#userEmail').fill(email);
        await page.locator('#userPassword').fill(password);
        await page.locator('#login').click();
    } else {
        // use provided credentials
        await page.locator('#userEmail').fill(email);
        await page.locator('#userPassword').fill(password);
        await page.locator('#login').click();
    }

    // Wait for dashboard and product cards to load
    await page.waitForSelector('.card-body', { timeout: 60_000 });
    const productCards = page.locator('.card-body');
    const productCount = await productCards.count();
    console.log(`Total products found: ${productCount}`);
    // Fetch names and prices in bulk to reduce round-trips and avoid page/context closures
    const names = (await productCards.locator('h5').allTextContents()).length ? await productCards.locator('h5').allTextContents() : await productCards.locator('b').allTextContents();
    const prices = await productCards.locator('p').allTextContents().catch(() => []);
    for (let i = 0; i < productCount; i++) {
        const productName = names[i] || '';
        const productPrice = prices[i] || '';
        console.log(`Product ${i + 1}: Name - ${productName}, Price - ${productPrice}`);
    }

});
    
