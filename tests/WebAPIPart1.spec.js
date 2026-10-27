import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../Utils/APIUtils';

const loginPayload = { userEmail: "Tusharpatil1@gmail.com", userPassword: "Niks@1234" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };

let response;
let apiUtils;

test.beforeAll(async()=> {
    const apiContext = await request.newContext();
    apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});


test('@API Client App Login', async ({ page }) => {
    const token = response?.token;
    await page.goto('https://rahulshettyacademy.com/client/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(tokenValue => {
        window.localStorage.setItem('token', tokenValue);
    }, response.token);
    await page.goto('https://rahulshettyacademy.com/client/', { waitUntil: 'domcontentloaded' });



    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const orderRows = page.locator("tbody tr");
    await orderRows.first().waitFor({ timeout: 10000 }).catch(() => { });
    const rowCount = await orderRows.count();
    expect(rowCount).toBeGreaterThan(0);

});
