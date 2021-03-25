import * as pageScraper from "./pageScraper";
import * as api from './api';

async function scrapeAll(browserInstance, scrapleFunction) {
  let browser;
  try {
    browser = await browserInstance;
    const data = await scrapleFunction(browser);

    console.log('scrapled FINISHED');
    console.log("scrapled data: ", data);

    await api.uploadToDB(data)
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }

  await browser.close();
}

export const defaultExample = (browserInstance) =>
  scrapeAll(browserInstance, pageScraper.defaultScraple);
export const avitoExample = (browserInstance) =>
  scrapeAll(browserInstance, pageScraper.avitoScraple);
