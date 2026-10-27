const { expect } = require('@playwright/test');
class CartPage
{
constructor(page)
{
    this.page = page;
    this.cartProducts = page.locator("div li").first();
    this.productsText = page.locator(".card-body b");
    this.cart =  page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
    this.checkout = page.locator("text=Checkout");

}

async VerifyProductIsDisplayed(productName)
{
    if (this.page.isClosed && this.page.isClosed()) {
        throw new Error('Cannot verify product: page is already closed');
    }
    // Wait briefly for the cart view to render
    await this.page.waitForTimeout(800);
    try {
        await expect(this.cartProducts).toBeVisible({ timeout: 15000 });
    } catch (err) {
        // capture diagnostics
        await this.page.screenshot({ path: 'cart_verify_error.png' }).catch(() => {});
        const url = this.page.url();
        const content = await this.page.content();
        // include some diagnostic info in the thrown error
        const message = `Cart did not show products. URL: ${url}\nPage length: ${content.length}`;
        const e = new Error(message);
        e.cause = err;
        throw e;
    }
    const locator = this.getProductLocator(productName);
    await expect(locator).toBeVisible({ timeout: 5000 });

}

async Checkout()
{
    await this.checkout.waitFor({ state: 'visible', timeout: 5000 });
    await this.checkout.click();
}

 getProductLocator(productName)
{
    return  this.page.locator("h3:has-text('"+productName+"')");
}

}
module.exports = {CartPage};