// Externals Imports
const puppeteer = require('puppeteer');
const { customWait } = require('./waiting');

// Internals Imports

// Constants
const defHeadless = false;
const defArgs = [
  '--no-sandbox',
  '--disable-setuid-sandbox',
  '--disable-infobars',
  '--window-position=0,0',
  '--ignore-certifcate-errors',
  '--ignore-certifcate-errors-spki-list',
  '--incognito',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-infobars',
  '--enable-local-sync-backend',
  '--enable-features=NetworkService',
];

// Functions
// Open a browser
exports.openBrowser = async ({ headless, args }) => {
  try {
    const browser = await puppeteer.launch({
      headless: headless || defHeadless,
      args: args || defArgs,
    });
    return browser;
  } catch (error) {
    console.log(error);
  }
};

// Close a browser
exports.closeBrowser = async (browser) => {
  try {
    await browser.close();
  } catch (error) {
    console.log(error);
  }
};

// Open a new page
exports.openPage = async (browser) => {
  try {
    const page = await browser.newPage();
    return page;
  } catch (error) {
    console.log(error);
  }
};

// Close a page
exports.closePage = async (page) => {
  try {
    await page.close();
  } catch (error) {
    console.log(error);
  }
};

// Go to a page
exports.goToPage = async (page, url) => {
  try {
    await page.goto(url);
  } catch (error) {
    console.log(error);
  }
};

// Wait for a selector
exports.waitForSelector = async (page, selector) => {
  try {
    await page.waitForSelector(selector);
  } catch (error) {
    console.log(error);
  }
};

// Click on a selector
exports.clickOnSelector = async (page, selector) => {
  try {
    await page.click(selector);
  } catch (error) {
    console.log(error);
  }
};

// Type
exports.type = async (page, text) => {
  try {
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      await page.keyboard.type(char);
      await customWait(50, 100);
    }
  } catch (error) {
    console.log(error);
  }
};

// Press keybord key
exports.pressKeyboardKey = async (page, key) => {
  try {
    await page.keyboard.press(key);
  } catch (error) {
    console.log(error);
  }
};
