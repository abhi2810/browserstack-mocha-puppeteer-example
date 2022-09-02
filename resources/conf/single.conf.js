exports.capabilities = [
  {
    browser: "chrome",
    browser_version: "latest",
    os: "os x",
    os_version: "big sur",
    build: "browserstack-examples-puppeteer",
    name: "single_test",
    "browserstack.username":
      process.env.BROWSERSTACK_USERNAME || "YOUR_USERNAME",
    "browserstack.accessKey":
      process.env.BROWSERSTACK_ACCESS_KEY || "YOUR_ACCESS_KEY",
    "browserstack.debug": true,
  },
];
