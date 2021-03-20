const scraperObject = {
  async defaultScraple(browser) {
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
  },
  async avitoScraple(browser) {
    const url =
      "https://www.avito.ru/moskva_i_mo/tovary_dlya_kompyutera/komplektuyuschie/videokarty-ASgBAgICAkTGB~pm7gmmZw?pmax=35000&q=2070&user=1";
    let page = await browser.newPage();

    console.log(`Navigating to ${url}...`);

    await page.goto(url);

    // Wait for the required DOM to be rendered
    await page.waitForSelector("body div div[class*='items-items-'");

    console.log("ddd", await page.$$eval("div", (divs) => divs.length));
    console.log("ddd", await page.$$eval("div", (divs) => divs.length));
    // Get the link to all the required books
    // TODO: разобраться почему тут не получается выполнить селект с заголовками .... 
    let urls = await page.$$eval("div > div[class*='iva-item-titleStep']", (names) => {
      // Make sure the book to be scraped is in stock
      //links = links.filter(
      //(link) =>
      //link.querySelector(".instock.availability > i").textContent !==
      //"In stock"
      //);
      console.log("names", names.lenght);

      console.log("names", names);

      //names.forEach(({ innerText }) => console.log("innerText", innerText));

      // Extract the links from the data
      //links = links.map((el) => el.querySelector("h3 > a").href);
      return names;
    });

    console.log(urls);

    await browser.close();
    return;

    // Loop through each of those links, open a new page instance and get the relevant data from them
    //let pagePromise = (link) =>
    //new Promise(async (resolve, reject) => {
    //let dataObj = {};
    //let newPage = await browser.newPage();

    //await newPage.goto(link);

    //dataObj["bookTitle"] = await newPage.$eval(
    //".product_main > h1",
    //(text) => text.textContent
    //);

    //dataObj["bookPrice"] = await newPage.$eval(
    //".price_color",
    //(text) => text.textContent
    //);

    //dataObj["noAvailable"] = await newPage.$eval(
    //".instock.availability",
    //(text) => {
    //// Strip new line and tab spaces
    //text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "");
    //// Get the number of stock available
    //let regexp = /^.*\((.*)\).*$/i;
    //let stockAvailable = regexp.exec(text)[1].split(" ")[0];
    //return stockAvailable;
    //}
    //);
    //dataObj["imageUrl"] = await newPage.$eval(
    //"#product_gallery img",
    //(img) => img.src
    //);
    //dataObj["bookDescription"] = await newPage.$eval(
    //"#product_description",
    //(div) => div.nextSibling.nextSibling.textContent
    //);
    //dataObj["upc"] = await newPage.$eval(
    //".table.table-striped > tbody > tr > td",
    //(table) => table.textContent
    //);
    //resolve(dataObj);
    //await newPage.close();
    //});

    //for (link in urls) {
    //let currentPageData = await pagePromise(urls[link]);
    //// scrapedData.push(currentPageData);
    //console.log(currentPageData);
    //}
  },
};

module.exports = scraperObject;
