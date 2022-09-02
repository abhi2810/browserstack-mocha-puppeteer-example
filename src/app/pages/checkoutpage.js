module.exports  = class CheckoutPage {
    constructor(page) {
        this.page = page;
    }

    async enterCheckoutDetails(){
        await page.waitForSelector('#firstNameInput');
        await page.type('#firstNameInput', 'first');
        await page.type('#lastNameInput', 'last');
        await page.type('#addressLine1Input', 'test address');
        await page.type('#provinceInput', 'test province');
        await page.type('#postCodeInput', '123456');
    }

    async clickCheckoutButton(){
        await page.click('#checkout-shipping-continue');
        await page
            .waitForSelector('#checkout-app > div > div > div > div > a > button');
        await page.click('#checkout-app > div > div > div > div > a > button');
    }
}
