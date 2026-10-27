const { test, expect } = require('@playwright/test');



test('Security test request intercept', async ({ page }) => {

    // login and reach order page 
    const email = "Tusharpatil1@gmail.com";
    const productsName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.getByPlaceholder("email@example.com").fill("Tusharpatil1@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Niks@1234");
    await page.getByRole("button", { name: "Login" }).click();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body").first().waitFor();

    await page.locator("button[routerlink*='myorders']").click();
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        //continue method is used to intercept request calls.
        route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=621661f884b053f6765465b6' })
    );

    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator(".blink_me")).toHaveText("You are not authorize to view this order");


});