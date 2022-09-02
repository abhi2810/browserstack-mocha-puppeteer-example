const { expect } = require("chai");
const { puppeteerTest } = require("./setup");
const { createPage, markTestStatus } = require("../utils/utility");

puppeteerTest("Users", function (caps) {
  it("Login as User with no image loaded", async () => {
    this.page = await createPage(caps, "Login as User with no image loaded");
    await this.page.click("#signin");

    await this.page.waitForSelector("#react-select-2-input");
    await this.page.click("#react-select-2-input");
    await this.page.type("#react-select-2-input", "image_not_loading_user");
    await this.page.keyboard.press("Enter");

    await this.page.click("#react-select-3-input");
    await this.page.type("#react-select-3-input", "testingisfun99");
    await this.page.keyboard.press("Enter");

    await this.page.click("#login-btn");

    await this.page.waitForSelector('img[alt="iPhone 12"]');
    const src = await this.page.evaluate(`
      document.querySelector(\'img[alt="iPhone 12"]\').getAttribute(\'src\')
    `);

    try {
      expect(src).to.be.empty;
      markTestStatus(page, "Passed", "Test Passed");
    } catch {
      markTestStatus(page, "failed", "Test Failed");
    }
  });

  it("Login as User with existing Orders", async () => {
    this.page = await createPage(caps, "Login as User with existing Orders");
    await this.page.click("#signin");

    await this.page.waitForSelector("#react-select-2-input");
    await this.page.click("#react-select-2-input");
    await this.page.type("#react-select-2-input", "existing_orders_user");
    await this.page.keyboard.press("Enter");

    await this.page.click("#react-select-3-input");
    await this.page.type("#react-select-3-input", "testingisfun99");
    await this.page.keyboard.press("Enter");

    await this.page.click("#login-btn");

    await this.page.waitForSelector("#orders");
    await this.page.click("#orders");

    await this.page.waitForSelector(".order");
    const favouriteItems = await this.page.$$(".order");

    try {
      expect(favouriteItems.length).to.be.above(0);
      markTestStatus(page, "Passed", "Test Passed");
    } catch {
      markTestStatus(page, "failed", "Test Failed");
    }
  });

  it("Login as User and Add Favourites", async () => {
    this.page = await createPage(caps, "Login as User and Add Favourites");
    await this.page.click("#signin");

    await this.page.waitForSelector("#react-select-2-input");
    await this.page.click("#react-select-2-input");
    await this.page.type("#react-select-2-input", "existing_orders_user");
    await this.page.keyboard.press("Enter");

    await this.page.click("#react-select-3-input");
    await this.page.type("#react-select-3-input", "testingisfun99");
    await this.page.keyboard.press("Enter");

    await this.page.click("#login-btn");

    await this.page.waitForSelector(".MuiIconButton-label");
    const favouriteButtons = await this.page.$$(".MuiIconButton-label");
    await favouriteButtons[1].click({ delay: 500 });
    await favouriteButtons[2].click({ delay: 500 });
    await favouriteButtons[3].click({ delay: 500 });

    await this.page.click("#favourites");
    await this.page.waitForSelector(".shelf-item");
    const favouriteItems = await this.page.$$(".shelf-item");

    try {
      expect(favouriteItems.length).to.equal(3);
      markTestStatus(page, "Passed", "Test Passed");
    } catch {
      markTestStatus(page, "failed", "Test Failed");
    }
  });
});
