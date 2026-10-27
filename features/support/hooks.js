const playwright = require('playwright');
const { POManager } = require('../../Pageobjects/POManager');
const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber');
const path = require('node:path');

Before(async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    this.browser = browser;
    this.context = context;
    this.page = page;
    this.poManager = new POManager(this.page);
});

After(async function () {
  // close Playwright browser/context if created
  try {
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
  } catch (e) {
    console.warn('Error closing browser/context in After hook:', e.message);
  }
});

BeforeStep( function ()
{

});

AfterStep( async function ({result})
{
   if(result.status === Status.FAILED)
   {
      await this.page.screenshot({path: `./screenshots/${result.status}_${Date.now()}.png`});
   }
});