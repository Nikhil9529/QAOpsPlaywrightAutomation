class DashboardPage {

constructor(page)
{
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator("[routerlink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
}

async searchProductAddCart(productName)
{
       await this.products.first().waitFor({ state: 'visible', timeout: 10000 });
       const productNames = await this.productsText.allTextContents();
       console.log(productNames);
       const count = await this.products.count();
       const targetLower = productName.trim().toLowerCase();
       let found = false;
       for (let i = 0; i < count; ++i) {
           const name = (await this.products.nth(i).locator("b").textContent()).trim();
           const nameLower = name.toLowerCase();
           if (nameLower.includes(targetLower) || targetLower.includes(nameLower)) {
               found = true;
               const addButton = this.products.nth(i).locator("button:has-text('Add To Cart')");
               await addButton.waitFor({ state: 'visible', timeout: 5000 });
               await addButton.click();
               // small pause to allow SPA to update cart state
               await this.page.waitForTimeout(800);
               break;
           }
       }
       if (!found) {
           throw new Error(`Product not found on dashboard: ${productName}. Available: ${productNames.join(', ')}`);
       }
}

async navigateToCart()
{
    await this.cart.click();
    // allow cart view to render
    await this.page.waitForTimeout(800);
}

async navigateToOrders()
{
    await this.orders.click();
    // wait for orders table to render
    await this.page.locator('tbody').waitFor({ state: 'visible', timeout: 10000 }).catch(()=>{});
    await this.page.waitForTimeout(500);
}
}
module.exports = {DashboardPage};