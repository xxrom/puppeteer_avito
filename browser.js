const puppeteer = require("puppeteer");

const getBrowser = async () => {
  console.log("getting browser instance...");

  return await puppeteer.launch({
    //headless: true,
    headless: false,
    args: ["--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true,
  });
};

const startBrowser = async () => {
  try {
    return getBrowser();
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }
};

module.exports = {
  startBrowser,
};
