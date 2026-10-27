import { test, expect, request } from '@playwright/test';
import { APIUtils } from '../utils/APIUtils.js';

const loginPayload = { userEmail: "Tusharpatil1@gmail.com", userPassword: "Niks@1234" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };
const fakePayloadOrders = {"data":[],"message":"No Orders"};

let response;
let apiUtils;

test.beforeAll(async()=> {
    const apiContext = await request.newContext();
    apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);

});


test("Client App Login", async ({ page }) => {
    const token = response?.token;
    await page.goto('https://rahulshettyacademy.com/client/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(tokenValue => {
        window.localStorage.setItem('token', tokenValue);
    }, response.token);
    await page.goto('https://rahulshettyacademy.com/client/', { waitUntil: 'domcontentloaded' });
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*", 
    async route=>
    {
       const response = await page.request.fetch(route.request());
       let body = JSON.stringify(fakePayloadOrders);
       route.fulfill(
        {
            response,
            body
        }
       )
        //intercepting the response - API response->{Playwright fakeresponse}->browser-> render data on front end
    }
    )



    await page.locator("button[routerlink*='myorders']").click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*");    
    console.log(await page.locator(".mt-4").textContent());
    //await page.locator("tbody").waitFor();
    //const orderRows = page.locator("tbody tr");

});
