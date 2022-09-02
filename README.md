![Logo](https://www.browserstack.com/images/static/header-logo.jpg)

# BrowserStack Examples Puppeteer <a href="https://pptr.dev/"><img src="https://user-images.githubusercontent.com/10379601/29446482-04f7036a-841f-11e7-9872-91d1fc2ea683.png" alt="Puppeteer" height="22" /></a>

## Introduction

[Puppeteer](https://pptr.dev/) is a Node library which provides a high-level API to control headless Chrome or Chromium over the DevTools Protocol. It can also be configured to use full (non-headless) Chrome or Chromium. Like Selenium,Puppeteer can be used for UI testing.

This BrowserStack Example repository demonstrates a Puppeteer test framework written in Mocha and Chai with parallel testing capabilities. The Puppeteer test scripts are written for the open source [BrowserStack Demo web application](https://bstackdemo.com) ([Github](https://github.com/browserstack/browserstack-demo-app)). This BrowserStack Demo App is an e-commerce web application which showcases multiple real-world user scenarios. The app is bundled with offers data, orders data and products data that contains everything you need to start using the app and run tests out-of-the-box.

The Puppeteer test tests are run on different platforms like on-prem, docker and BrowserStack using various run configurations and test capabilities.

---

## Repository setup

- Clone the repository

- Ensure you have the following dependencies installed on the machine

  - Node >= 10.18.1

    ```sh
    npm install
    ```

## About the tests in this repository

This repository contains the following Puppeteer tests:

| Module  | Test name                             | Description                                                                                                                                                                                                                                                                       |
| ------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E2E     | End to End Scenario                   | This test scenario verifies successful product purchase lifecycle end-to-end. It demonstrates the [Page Object Model design pattern](https://www.browserstack.com/guide/page-object-model-in-selenium) and is also the default test executed in all the single test run profiles. |
| Login   | Navigate to Signin                    | This test verifies whether Sign In page is displayed after clicking on Favourites.                                                                                                                                                                                                |
| Login   | Login as Locked User                  | This test verifies the login workflow error for a locked user.                                                                                                                                                                                                                    |
| Product | Apply Apple and Samsung Vendor Filter | This test verifies that 16 Apple and Samsung products are only shown if the Apple vendor filter option is applied.                                                                                                                                                                |
| Product | Apply Lowest to Highest Order By      | This test verifies that the product prices are in ascending order when the product sort "Lowest to Highest" is applied.                                                                                                                                                           |
| User    | Login as User with no image loaded    | This test verifies that the product images load for user: "image_not_loading_user" on the e-commerce application. Since the images do not load, the test case assertion fails.                                                                                                    |
| User    | Login as User with existing Orders    | This test verifies that existing orders are shown for user: "existing_orders_user"                                                                                                                                                                                                |
| User    | Login as User and Add Favourites      | This test verifies that we are able to add favourites for user: "existing_orders_user"                                                                                                                                                                                            |

---

## Configuring the maximum parallel test threads for this repository

For all the parallel run configuration profiles, you can configure the maximum parallel test threads by changing the settings below.

- Node:

  [package.json](package.json)

  parallel_count = 5

## Test Reporting

- [Mochawesome Reports](#mochawesome-reports)

---

# BrowserStack

[BrowserStack](https://browserstack.com) provides instant access to 2,000+ real mobile devices and browsers on a highly reliable cloud infrastructure that effortlessly scales as testing needs grow.

## Prerequisites

- Create a new [BrowserStack account](https://www.browserstack.com/users/sign_up) or use an existing one.
- Identify your BrowserStack username and access key from the [BrowserStack Automate Dashboard](https://automate.browserstack.com/) and export them as environment variables using the below commands.

  - For \*nix based and Mac machines:

  ```sh
  export BROWSERSTACK_USERNAME=<browserstack-username> &&
  export BROWSERSTACK_ACCESS_KEY=<browserstack-access-key>
  ```

  - For Windows:

  ```shell
  set BROWSERSTACK_USERNAME=<browserstack-username>
  set BROWSERSTACK_ACCESS_KEY=<browserstack-access-key>
  ```

  Alternatively, you can also hardcode username and access_key objects in the [\*.conf.js](resources/conf) files.

Note:

- We have configured a list of test capabilities in the [\*.conf.js](resources/conf) files. You can certainly update them based on your device / browser test requirements.
- The exact test capability values can be easily identified using the [Browserstack Capability Generator](https://browserstack.com/automate/capabilities)

## Running Your Tests

### Run a specific test on your own machine

In this section, we will run a single test on Chrome browser on Browserstack. To change test capabilities for this configuration, please refer to the `single.conf.js` file.

- How to run the test?

  - To run the default test scenario (e.g. End to End Scenario) on a single BrowserStack browser, use the following command:

  ```sh
  npm run single-default
  ```

  To run a specific test, use the following command with the additional '-g' flag:

  ```sh
  npm run single -- -g "<Test Name>"
  ```

  where, `<Test Name>` would be name of tests as in `it()` functions in tests.

  E.g. "Login as username", "Login as Locked User" or any of the other test names, as outlined in [About the tests in this repository](#About-the-tests-in-this-repository) section.

- Output

  This run profile executes tests on a single browser on BrowserStack. Please refer to your [BrowserStack dashboard](https://automate.browserstack.com/) for test results.

### Run the entire test suite in parallel on a multiple BrowserStack browsers

In this section, we will run the tests in parallel on a multiple browsers on Browserstack. Refer to `parallel.conf.js` file to change test capabilities for this configuration.

- How to run the test?

  To run the entire test suite in parallel on a single BrowserStack browser, use the following command:

  ```sh
  npm run parallel
  ```

- Output

  This run profile executes the entire test suite in parallel on a single BrowserStack browser. Please refer to your [BrowserStack dashboard](https://automate.browserstack.com/) for test results.

  - Note: By default, this execution would run maximum 5 test threads in parallel on BrowserStack. Refer to the section ["Configuring the maximum parallel test threads for this repository"](#Configuring-the-maximum-parallel-test-threads-for-this-repository) for updating the parallel thread count based on your requirements.

### [Web application hosted on internal environment] Running your tests on BrowserStack using BrowserStackLocal

#### Prerequisites

- Clone the [BrowserStack demo application](https://github.com/browserstack/browserstack-demo-app) repository.
  ```sh
  git clone https://github.com/browserstack/browserstack-demo-app
  ```
- Please follow the README.md on the BrowserStack demo application repository to install and start the dev server on localhost.
- In this section, we will run a single test case to test the BrowserStack Demo app hosted on your local machine i.e. localhost. Refer to the `local.conf.js` file to change test capabilities for this configuration.
- Note: You may need to provide additional BrowserStackLocal arguments to successfully connect your localhost environment with BrowserStack infrastructure. (e.g if you are behind firewalls, proxy or VPN).
- Further details for successfully creating a BrowserStackLocal connection can be found here:

  - [Local Testing with Automate](https://www.browserstack.com/local-testing/automate)
  - [BrowserStackLocal Nodejs GitHub](https://github.com/browserstack/browserstack-local-nodejs)

### [Web application hosted on internal environment] Run the entire test suite in parallel on a single BrowserStack browser using BrowserStackLocal

In this section, we will run the test cases to test the internally hosted website in parallel on a single browser on Browserstack. Refer to the `local.conf.js` file to change test capabilities for this configuration.

- How to run the test?

  To run the entire test suite in parallel on a single BrowserStack browser using BrowserStackLocal, use the following command:

  ```sh
  npm run local
  ```

- Output

  This run profile executes the entire test suite on an internally hosted web application on a single browser on BrowserStack. Please refer to your [BrowserStack dashboard](https://automate.browserstack.com/) for test results.

- Note: By default, this execution would run maximum 5 test threads in parallel on BrowserStack. Refer to the section ["Configuring the maximum parallel test threads for this repository"](#Configuring-the-maximum-parallel-test-threads-for-this-repository) for updating the parallel thread count based on your requirements.

## Mochawesome Reports

Whenever a test is run Mochawesome Report can be found at [mochawesome-report/mochawesome.html](mochawesome-report/mochawesome.html).

## Additional Resources

- View your test results on the [BrowserStack Automate dashboard](https://www.browserstack.com/automate)
- Customizing your tests capabilities on BrowserStack using our [test capability generator](https://www.browserstack.com/automate/capabilities)
- [List of Browsers & mobile devices](https://www.browserstack.com/list-of-browsers-and-platforms?product=automate) for automation testing on BrowserStack
- [Using Automate REST API](https://www.browserstack.com/automate/rest-api) to access information about your tests via the command-line interface
- Understand how many parallel sessions you need by using our [Parallel Test Calculator](https://www.browserstack.com/automate/parallel-calculator?ref=github)
- For testing public web applications behind IP restriction, [Inbound IP Whitelisting](https://www.browserstack.com/local-testing/inbound-ip-whitelisting) can be enabled with the [BrowserStack Enterprise](https://www.browserstack.com/enterprise) offering

[comment]: <> (## Observations)
