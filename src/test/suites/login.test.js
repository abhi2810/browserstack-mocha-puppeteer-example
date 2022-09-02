const { expect } = require("chai");
const { puppeteerTest } = require("./setup");
const { createPage, markTestStatus } = require("../utils/utility");

puppeteerTest("Login", function (caps) {
  it("Navigate to Signin", async () => {
    this.page = await createPage(caps, "Navigate to Signin");
    await this.page.click("#favourites");

    const element = await this.page.waitForSelector("#react-select-2-input");
    try {
      expect(element).to.not.be.undefined;
      markTestStatus(page, "Passed", "Test Passed");
    } catch {
      markTestStatus(page, "failed", "Test Failed");
    }
  });

  it("Login as Locked User", async () => {
    this.page = await createPage(caps, "Login as Locked User");
    await this.page.click("#signin");

    await this.page.waitForSelector("#react-select-2-input");
    await this.page.click("#react-select-2-input");
    await this.page.type("#react-select-2-input", "locked_user");
    await this.page.keyboard.press("Enter");

    await this.page.click("#react-select-3-input");
    await this.page.type("#react-select-3-input", "testingisfun99");
    await this.page.keyboard.press("Enter");

    await this.page.click("#login-btn");

    await this.page.waitForSelector(".api-error");
    const src = await this.page.evaluate(
      "document.querySelector('.api-error').innerHTML"
    );

    try {
      expect(src).to.equal("Your account has been locked.");
      markTestStatus(page, "Passed", "Test Passed");
    } catch {
      markTestStatus(page, "failed", "Test Failed");
    }
  });
});
