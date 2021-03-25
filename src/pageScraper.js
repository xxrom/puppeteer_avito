export const avitoScraple = async (browser) => {
  const urlCommon =
    "https://www.avito.ru/moskva_i_mo/tovary_dlya_kompyutera/komplektuyuschie/";

  const url_2070_0_35 = "videokarty-ASgBAgICAkTGB~pm7gmmZw?pmax=35000&q=2070";
  const url_Gtx_10_35 =
    "videokarty-ASgBAgICAkTGB~pm7gmmZw?pmax=35000&pmin=10000&q=gtx&s=104";

  const url = `${urlCommon}${url_Gtx_10_35}`;

  console.log(`Navigating to ${url} ... \n`);
  const page = await browser.newPage();

  await page.goto(url);

  // Wait for the required DOM to be rendered
  console.log(`rendering ... \n`);
  await page.waitForSelector("body div div[class*=titleStep");

  // Get the link to all the required books
  const names = await page.$$eval("div > [class*=titleStep]", (items) =>
    items.map(({innerText}) => innerText)
  );

  await page.waitForSelector("div > [class*=item-root");

  const data = await page.$$eval("div > [class*=item-root]", (elements) => {
    elements = elements.map((element) => {
      try {
        const id = element.getAttribute('id');
        const link = element.querySelector("[class*=link-link-]").getAttribute('href');
        const title =
          element.querySelector("[class*=titleStep]").innerText;
        const price =
          element.querySelector("[class*=price-text]").innerText;
        const timeAgo =
          element.querySelector("[class*=date-text]").innerText;
        const geo = element.querySelector("[class*=geo-root]").innerText;

        return {id, link, title, price, timeAgo, geo};
      } catch (e) {
        console.log("error", e);
      }

      return null;
    });
    return elements;
  });

  return data;
};

export const defaultScraple = async (browser) => {
  const url = "http://books.toscrape.com";
  let page = await browser.newPage();

  console.log(`Navigating to ${url}...`);

  await page.goto(url);

  // Wait for the required DOM to be rendered
  await page.waitForSelector(".page_inner");

  // Get the link to all the required books
  let urls = await page.$$eval("section ol > li", (links) => {
    // Make sure the book to be scraped is in stock
    links = links.filter(
      (link) =>
        link.querySelector(".instock.availability > i").textContent !==
        "In stock"
    );

    // Extract the links from the data
    links = links.map((el) => el.querySelector("h3 > a").href);
    return links;
  });

  console.log(urls);

  // Loop through each of those links, open a new page instance and get the relevant data from them
  let pagePromise = (link) =>
    new Promise(async (resolve, reject) => {
      let dataObj = {};
      let newPage = await browser.newPage();

      await newPage.goto(link);

      dataObj["bookTitle"] = await newPage.$eval(
        ".product_main > h1",
        (text) => text.textContent
      );

      dataObj["bookPrice"] = await newPage.$eval(
        ".price_color",
        (text) => text.textContent
      );

      dataObj["noAvailable"] = await newPage.$eval(
        ".instock.availability",
        (text) => {
          // Strip new line and tab spaces
          text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
          // Get the number of stock available
          let regexp = /^.*\((.*)\).*$/i;
          let stockAvailable = regexp.exec(text)[1].split(" ")[0];
          return stockAvailable;
        }
      );
      dataObj["imageUrl"] = await newPage.$eval(
        "#product_gallery img",
        (img) => img.src
      );
      dataObj["bookDescription"] = await newPage.$eval(
        "#product_description",
        (div) => div.nextSibling.nextSibling.textContent
      );
      dataObj["upc"] = await newPage.$eval(
        ".table.table-striped > tbody > tr > td",
        (table) => table.textContent
      );
      resolve(dataObj);
      await newPage.close();
    });

  for (link in urls) {
    let currentPageData = await pagePromise(urls[link]);
    // scrapedData.push(currentPageData);
    console.log(currentPageData);
  }
};

