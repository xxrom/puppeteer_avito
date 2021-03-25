import puppeteer from "puppeteer";

const getBrowser = async () => {
  console.log("Getting browser instance...");

  const browser = await puppeteer.launch({
    headless: true,
    //headless: false,
    args: ["--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
  });

  console.log('Got the browser.')

  return browser;
};

export const startBrowser = async () => {
  try {
    return getBrowser();
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }
};

