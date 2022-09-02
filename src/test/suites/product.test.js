const { expect } = require("chai");
const { isAscending } = require("../utils/utility");
const { puppeteerTest } = require("./setup");
const { createPage, markTestStatus } = require("../utils/utility");

puppeteerTest("Product", function (caps) {
  it("Apply Lowest to Highest Order By", async () => {
    this.page = await createPage(caps, "Apply Lowest to Highest Order By");
    await this.page.select("select", "lowestprice");
    const priceList = await this.page.$$(".shelf-item__price > div.val > b");
    try {
      expect(isAscending(priceList)).to.be.true;
      markTestStatus(page, "Passed", "Test Passed");
    } catch {
      markTestStatus(page, "failed", "Test Failed");
    }
  });

  it("Apply Apple and Samsung Vendor Filter", async () => {
    this.page = await createPage(caps, "Apply Apple and Samsung Vendor Filter");
    await this.page.click(".filters-available-size:nth-child(2) .checkmark");
    await this.page.click(".filters-available-size:nth-child(3) .checkmark");
    await this.page.waitForTimeout(1000);
    await this.page.waitForSelector(".shelf-item");
    const favouriteItems = await this.page.$$(".shelf-item");

    try {
      expect(favouriteItems.length).to.equal(16);
      markTestStatus(page, "Passed", "Test Passed");
    } catch {
      markTestStatus(page, "failed", "Test Failed");
    }
  });
});
