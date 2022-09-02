module.exports  = class HomePage {
    constructor(page) {
        this.page = page;
    }

    async gotoLoginPage(){
        await this.page.click('#signin');
    }

    async gotoOrdersPage(){
        await page.waitForSelector('#orders');
        await page.click('#orders');
    }

    async addItemsToCart(){
        await page.waitForSelector('.shelf-item__buy-btn');
        const buyButton = await page.$$('.shelf-item__buy-btn');
        await buyButton[1].click({delay: 500});
        await page.click('.float-cart__close-btn');
        await buyButton[2].click({delay: 500});
        await page.click('.float-cart__close-btn');
        await buyButton[3].click({delay: 500});
    }

    async clickOnBuyButton(){
        await page.click('.buy-btn');
    }
}
