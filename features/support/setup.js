const { setDefaultTimeout } = require('@cucumber/cucumber');

// Increase default step timeout to 60s for Playwright actions
setDefaultTimeout(60 * 1000);
