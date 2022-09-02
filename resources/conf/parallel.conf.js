var config = {
  commonCapabilities: {
    build: "browserstack-examples-puppeteer",
    name: "parallel_test",
    "browserstack.username":
      process.env.BROWSERSTACK_USERNAME || "YOUR_USERNAME",
    "browserstack.accessKey":
      process.env.BROWSERSTACK_ACCESS_KEY || "YOUR_ACCESS_KEY",
    "browserstack.debug": true,
  },
  multiCapabilities: [
    {
      browser: "chrome",
      browser_version: "latest",
      os: "osx",
      os_version: "catalina",
    },
    {
      browser: "firefox",
      browser_version: "latest",
      os: "osx",
      os_version: "catalina",
    },
    {
      browser: "edge",
      browser_version: "latest",
      os: "osx",
      os_version: "catalina",
    },
    {
      browser: "edge",
      browser_version: "latest",
      os: "Windows",
      os_version: "10",
    },
  ],
};

exports.capabilities = [];
config.multiCapabilities.forEach(function (caps) {
  var temp_caps = JSON.parse(JSON.stringify(config.commonCapabilities));
  exports.capabilities.push({ ...temp_caps, ...caps });
});
