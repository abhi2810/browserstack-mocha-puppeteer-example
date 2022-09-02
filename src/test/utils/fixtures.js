const browserstack = require("browserstack-local");
const caps = require("../../../resources/conf/local.conf").capabilities;
const localConfig = require("../../../resources/conf/local.conf").localConfig;

exports.mochaGlobalSetup = async function () {
  const caps_type = process.env.CAPS_TYPE;
  process.env.BUILD_TIMESTAMP = new Date().valueOf();
  if (caps_type === "local") {
    this.bs_local = new browserstack.Local();
    var bs_local_args = {
      ...localConfig,
      key:
        process.env.BROWSERSTACK_ACCESS_KEY ||
        caps[0]["browserstack.accessKey"],
    };
    console.log(bs_local_args);

    await new Promise((resolve, reject) => {
      this.bs_local.start(bs_local_args, function () {
        console.log("Started BrowserStackLocal");
        resolve();
      });
    });
  }
};

exports.mochaGlobalTeardown = async function () {
  const caps_type = process.env.CAPS_TYPE;
  if (caps_type === "local") {
    await new Promise((resolve, reject) => {
      this.bs_local.stop(function () {
        console.log("Stopped BrowserStackLocal");
        resolve();
      });
    });
  }
};
