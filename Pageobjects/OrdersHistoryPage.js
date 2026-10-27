const { expect } = require('@playwright/test');

class OrdersHistoryPage {
    constructor(page) {
        this.page = page;
        this.ordersTable = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderdIdDetails = page.locator(".col-text");
    }
    async searchOrderAndSelect(orderId) {

        await this.ordersTable.waitFor({ state: 'visible', timeout: 15000 });
        for (let i = 0; i < await this.rows.count(); ++i) {
            const rowOrderId = (await this.rows.nth(i).locator("th").textContent())?.trim();
            if (rowOrderId && orderId.includes(rowOrderId)) {
                await this.rows.nth(i).locator("button").first().click();
                await expect(this.page.locator(".col-text")).toBeVisible({ timeout: 15000 });
                return;
            }
        }

        throw new Error(`Order ${orderId} was not found in the orders history.`);
    }

    async getOrderId() {
        await this.orderdIdDetails.first().waitFor({ state: 'visible', timeout: 15000 });
        return (await this.orderdIdDetails.first().textContent()).trim();
    }

}
module.exports = { OrdersHistoryPage };
