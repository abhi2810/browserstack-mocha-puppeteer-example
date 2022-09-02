const { expect } = require("chai");
const CheckoutPage = require("../../app/pages/checkoutpage");
const HomePage = require("../../app/pages/homepage");
const LoginPage = require("../../app/pages/loginpage");
const OrdersPage = require("../../app/pages/orderspage");
const { createPage, markTestStatus } = require("../utils/utility");
const { puppeteerTest } = require("./setup");

puppeteerTest("E2E", function (caps) {
  it("End to End Scenario", async () => {
    this.page = await createPage(caps, "End to End Scenario");
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);
    const checkoutPage = new CheckoutPage(page);
    const orderPage = new OrdersPage(page);

    await homePage.gotoLoginPage();
    await loginPage.loginWithUsernamePassword("fav_user", "testingisfun99");
    await homePage.addItemsToCart();
    await homePage.clickOnBuyButton();
    await checkoutPage.enterCheckoutDetails();
    await checkoutPage.clickCheckoutButton();
    await homePage.gotoOrdersPage();
    const firstOrder = await orderPage.getFirstOrder();
    const orderedProductsList = await orderPage.getProductList(firstOrder);

    try {
      expect(orderedProductsList.length).to.equal(2);
      markTestStatus(page, "Passed", "Test Passed");
    } catch {
      markTestStatus(page, "failed", "Test Failed");
    }
  });
});
