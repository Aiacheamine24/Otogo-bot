// Externals Imports
const puppeteer = require('puppeteer');
const dotenv = require('dotenv');
const fs = require('fs');

// Internals Imports
const {
  openBrowser,
  openPage,
  goToPage,
  type,
  waitForSelector,
  pressKeyboardKey,
} = require('./utils/puppeteerFunctions');
const {
  getBrowserContext,
  grantWebsiteAuthorization,
} = require('./utils/puppeteerExtraFunctions');
const { customWait, fixedWait } = require('./utils/waiting');
const { getCarsData } = require('./controllers/getCarsData');

// Config
dotenv.config({
  path: './config/config.env',
});

// Constants
const { OTOGO_URL, NEXT_SELECTOR } = process.env;

// Main
const main = async () => {
  // Initialise carsData.json to an empty array
  fs.writeFileSync(`${__dirname}/_data/carsData.json`, JSON.stringify([]));
  // Clear sections.txt
  fs.writeFileSync(`${__dirname}/_data/sections.txt`, '');
  // Open a browser and a page
  const browser = await openBrowser({});
  const page = await openPage(browser);
  // Go to otogo website
  await goToPage(page, OTOGO_URL);
  // wait to load the page
  await fixedWait(3000);
  // Select Location input
  await pressKeyboardKey(page, 'Tab');
  await customWait();
  await pressKeyboardKey(page, 'Tab');
  await customWait();
  await pressKeyboardKey(page, 'Tab');
  await customWait();
  await pressKeyboardKey(page, 'Tab');
  await customWait();
  await pressKeyboardKey(page, 'Tab');
  await customWait();
  await pressKeyboardKey(page, 'Tab');
  await customWait(1000, 1500);
  // Type Montreal
  await type(page, 'Montreal');
  await customWait(1000, 2000);
  await pressKeyboardKey(page, 'Enter');
  await customWait(1000, 2000);
  await pressKeyboardKey(page, 'Tab');
  await pressKeyboardKey(page, 'Tab');
  await pressKeyboardKey(page, 'Enter');
  await page.waitForNavigation();
  // Ici Faut faire attention, car sa depend d'un utilisateur a l'autre
  await customWait(3000, 5000);
  await pressKeyboardKey(page, 'Tab');
  await fixedWait(500);
  await pressKeyboardKey(page, 'Tab');
  await fixedWait(500);
  await pressKeyboardKey(page, 'Tab');
  await fixedWait(500);
  await pressKeyboardKey(page, 'Tab');
  await fixedWait(500);
  await pressKeyboardKey(page, 'Tab');
  await fixedWait(500);
  await pressKeyboardKey(page, 'ArrowUp');
  await fixedWait(500);
  await pressKeyboardKey(page, 'Enter');
  // Repeat this process until there is more pages
  while (true) {
    await fixedWait(2000);
    const nbrCars = await getCarsData(page);
    try {
      // Click on next page button <a aria-label="Page suivante"
      await page.click(NEXT_SELECTOR);
      console.log('Next page');
      console.log(nbrCars);
      continue;
    } catch (error) {
      // If there is no more pages, break the loop
      console.log('No more pages');
      console.log(nbrCars);
      break;
    }
  }
};
// Go
main();
