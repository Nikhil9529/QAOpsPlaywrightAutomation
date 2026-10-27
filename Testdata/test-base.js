const base = require('@playwright/test');

exports.customtest = base.test.extend(
    {
    testDataForOrder: {
        username: "Tusharpatil1@gmail.com",
        password: "Niks@1234",
        productName: "Zara Coat 3"
    }
});
