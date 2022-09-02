const caps =
  require(`../../../resources/conf/${process.env.CAPS_TYPE}.conf`).capabilities;

exports.puppeteerTest = function (description, tests) {
  describe(description, () => {
    caps.forEach((caps) => {
      tests(caps);
    });

    afterEach(async () => {
      await this.browser.close();
    });
  });
};
