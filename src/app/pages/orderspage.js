module.exports  = class OrdersPage {
    constructor(page) {
        this.page = page;
    }

    async getFirstOrder(){
        await page.waitForSelector('.order');
        const ordersList = await page.$$('.order');
        return ordersList[0];
    }

    async getProductList(order){
        return await order
            .$$('.a-fixed-right-grid-inner.a-grid-vertical-align.a-grid-top');
    }
}
