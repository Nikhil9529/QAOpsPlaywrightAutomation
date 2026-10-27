const base = require('@playwright/test');
const { request } = require('@playwright/test');
const { APIUtils } = require('./APIUtils.js'); 

const loginPayload = { userEmail: "Tusharpatil1@gmail.com", userPassword: "Niks@1234" };
const orderPayload = { orders: [{ country: "India", productOrderedId: "6960eac0c941646b7a8b3e68" }] };




exports.customtest = base.test.extend({
    authenticatedPage: async ({ browser }, use) => 
    {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto("https://rahulshettyacademy.com/client");
        await page.getByPlaceholder("email@example.com").fill("Tusharpatil1@gmail.com");
        await page.getByPlaceholder("enter your passsword").fill("Niks@1234");
        await page.getByRole("button", { name: "Login" }).click();
        await page.waitForLoadState('networkidle');
        await use(page);

    },

    createOrder : async({},use)=>
    {
        const apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext, loginPayload);
        const response = await apiUtils.createOrder(orderPayload);
        await use(response);
        await apiContext.dispose();
        
    },

    testDataForOrder : {
        productName : 'ADIDAS ORIGINAL'
    }
});
