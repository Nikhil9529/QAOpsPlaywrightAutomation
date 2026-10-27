import { test, expect } from '@playwright/test';

test("Client App Login", async ({ page }) => {
    const email = "Tusharpatil1@gmail.com";
    const productsName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    await page.locator('#userEmail').fill("Tusharpatil1@gmail.com");
    await page.locator('#userPassword').fill("Niks@1234");
    await page.locator('#login').click();
    //await page.waitForLoadState('networkidle');
    await page.locator(".card-body").first().waitFor();
    const productNames = await page.locator('.card-body b').allTextContents();
    console.log(productNames);
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productsName) {
            // Add to Cart
            await products.nth(i).locator("button:has-text('Add To Cart')").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("input[value='4542 9931 9292 2293']").fill("4542 9931 9292 2293");
    await page.locator("select.input.ddl").nth(0).selectOption("01");
    await page.locator("select.input.ddl").nth(1).selectOption("26");
    await page.locator("(//input[@type='text'])[2]").fill("679");
    await page.locator("(//input[@type='text'])[3]").fill("Tushar P Patil");
    await page.locator("input[name='coupon']").fill("rahulshettyacademy");
    await page.locator("button:has-text('Apply Coupon')").click();

    // Auto-suggestive dropdown
    //await page.locator("input[placeholder='Select Country']").fill("ind", { delay: 100 });
    //await page.waitForTimeout(1000);

    /*await page.locator("await this.selectCountry("India");").type("ind", { delay: 100 });
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    let optionsCount = await dropdown.locator("button").count();

    for (let i = 0; i < optionsCount; i++)
    {
        let text = await dropdown.locator("button").nth(i).textContent(); 
        if (text.trim() === "India") 
        {  
            await dropdown.locator("button").nth(i).click();
            break; 
        }
    }*/
    await page.locator("input[placeholder='Select Country']").click();
    await page.locator("input[placeholder='Select Country']").type("Ind");
    await page.locator("//span[normalize-space()='India']").waitFor();
    await page.locator("//span[normalize-space()='India']").click();
    
    await page.locator(".action__submit").click();
    await page.locator(".hero-primary").waitFor();
    const confirmMessage = await page.locator(".hero-primary").textContent();
    expect(confirmMessage).toBe(" Thankyou for the order. ");
    console.log(confirmMessage);

    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) 
    {
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if (orderID.includes(rowOrderID)) 
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
     const orderIDDetails = await page.locator(".col-text").textContent();
     expect(orderID.includes(orderIDDetails)).toBeTruthy();
});
