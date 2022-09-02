const puppeteer = require("puppeteer");

exports.isAscending = function isAscending(priceList) {
  for (let i = 0; i < priceList.length - 1; i++) {
    if (
      priceList[i].evaluate((n) => n.innerText) >
      priceList[i + 1].evaluate((n) => n.innerText)
    ) {
      return false;
    }
  }
  return true;
};

exports.createPage = async function createPage(caps, description) {
  var capability = { ...caps };
  var url = "https://bstackdemo.com/";
  const build_name = process.env.BROWSERSTACK_BUILD_NAME;
  if (build_name) {
    capability["build"] += ` - ${build_name}`;
  } else {
    capability["build"] += ` - ${process.env.BUILD_TIMESTAMP}`;
  }
  capability["name"] = description;
  this.browser = await puppeteer.connect({
    browserWSEndpoint: `wss://cdp.browserstack.com?caps=${encodeURIComponent(
      JSON.stringify(capability)
    )}`,
  });
  if (capability["browserstack.local"]) {
    url = "http://localhost:3000";
  }
  var page = await this.browser.newPage();
  await page.setDefaultNavigationTimeout(45000);
  await page.goto(url);
  return page;
};

exports.markTestStatus = async function markTestStatus(page, status, message) {
  await page.evaluate((_) => {},
  `browserstack_executor: ${JSON.stringify({ action: "setSessionStatus", arguments: { status: status, reason: message } })}`);
};
