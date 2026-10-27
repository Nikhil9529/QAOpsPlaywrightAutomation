const { test, expect, request } = require('@playwright/test');
const {customtest} = require("../Utils/fixtures");

customtest("Fixtures demo", async ({ authenticatedPage, createOrder, testDataForOrder }) => {
    await authenticatedPage.goto("https://rahulshettyacademy.com/client");
    await authenticatedPage.locator("button[routerlink*='myorders']").click();
    await authenticatedPage.locator("tbody").waitFor();
    await expect(authenticatedPage.locator("tbody")).toBeVisible();
    console.log(testDataForOrder.productName);


});