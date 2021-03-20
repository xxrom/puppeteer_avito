const pageScraper = require("./pageScraper");

async function scrapeAll(browserInstance, scrapleFunction) {
  let browser;
  try {
    browser = await browserInstance;
    await scrapleFunction(browser);
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }
}

module.exports = {
  defaultExample: (browserInstance) =>
    scrapeAll(browserInstance, pageScraper.defaultScraple),
  avitoExample: (browserInstance) =>
    scrapeAll(browserInstance, pageScraper.avitoScraple),
};
