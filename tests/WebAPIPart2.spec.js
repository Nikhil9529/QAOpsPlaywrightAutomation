import { test, expect } from '@playwright/test';
let webContext;

test.beforeAll(async ({ browser }) => {
    webContext = await browser.newContext();
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill("Tusharpatil1@gmail.com");
    await page.getByPlaceholder("enter your passsword").fill("Niks@1234");
    await page.getByRole("button", { name: "Login" }).click();
    await expect(page.locator(".card-body").first()).toBeVisible();
    await page.close();
});

test.afterAll(async () => {
    await webContext?.close();
});

test('@API Client App Login', async () => 
{
    const email = "Tusharpatil1@gmail.com";
    const productsName = 'ZARA COAT 3';
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const product = page.locator(".card-body").filter({ has: page.getByText(productsName, { exact: true }) });
    await expect(product).toHaveCount(1);
    await product.getByRole("button", { name: "Add To Cart" }).click();
    await page.locator("[routerlink*='cart']").click();
    await expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();
    await page.locator("text=Checkout").click();
    await page.locator("input[value='4542 9931 9292 2293']").fill("4542 9931 9292 2293");
    await page.locator("select.input.ddl").nth(0).selectOption("01");
    await page.locator("select.input.ddl").nth(1).selectOption("26");
    await page.locator("(//input[@type='text'])[2]").fill("679");
    await page.locator("(//input[@type='text'])[3]").fill("Tushar P Patil");
    await page.locator("input[name='coupon']").fill("rahulshettyacademy");
    await page.locator("button:has-text('Apply Coupon')").click();

    await page.locator("input[placeholder='Select Country']").click();
    await page.locator("input[placeholder='Select Country']").type("Ind");
    await page.locator("//span[normalize-space()='India']").waitFor();
    await page.locator("//span[normalize-space()='India']").click();
    
    await page.locator(".action__submit").click();
    await page.locator(".hero-primary").waitFor();
    const confirmMessage = await page.locator(".hero-primary").textContent();
    expect(confirmMessage).toBe(" Thankyou for the order. ");
    console.log(confirmMessage);

    const orderID = (await page.locator(".em-spacer-1 .ng-star-inserted").textContent())
        ?.replace(/\|/g, "")
        .trim();
    expect(orderID).toBeTruthy();

    await page.locator("button[routerlink*='myorders']").click();
    const orderRow = page.locator("tbody tr").filter({ hasText: orderID });
    await expect(orderRow).toHaveCount(1);
    await orderRow.locator("button").first().click();
    await expect(page.locator(".col-text")).toContainText(orderID);
});
