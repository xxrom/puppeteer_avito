require('source-map-support/register');
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/*! exports provided: uploadToDB */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uploadToDB", function() { return uploadToDB; });
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! node-fetch */ "node-fetch");
/* harmony import */ var node_fetch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(node_fetch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _parcingHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parcingHelpers */ "./src/parcingHelpers.js");


const URL = 'http://localhost:3010';
const uploadToDB = async data => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    },
    body: ''
  };
  const addCardUrl = `${URL}/card`;

  try {
    await data.forEach(async item => {
      console.log('item', item);
      let sendObject = null;

      if (!item) {
        return sendObject;
      }

      const {
        id,
        link,
        title,
        price,
        timeAgo,
        geo
      } = item;
      const card_id = Object(_parcingHelpers__WEBPACK_IMPORTED_MODULE_1__["convertIdToInt"])(id);
      const priceInt = Object(_parcingHelpers__WEBPACK_IMPORTED_MODULE_1__["convertPriceToInt"])(price);
      sendObject = {
        card_id,
        link,
        title,
        price: priceInt,
        timeAgo,
        geo
      };
      console.log('sendObject', sendObject);
      options.body = JSON.stringify(sendObject); // ADD new card to DB

      const response = await node_fetch__WEBPACK_IMPORTED_MODULE_0___default()(addCardUrl, options);

      if (response.ok) {
        const json = await response.json();
        console.log("response", json);
      } else {
        console.log("fetch error: ", response.status, response);
      }
    });
  } catch (e) {
    console.log('error', e.message);
  }

  console.log('sendListData', sendListData);
};

/***/ }),

/***/ "./src/browser.js":
/*!************************!*\
  !*** ./src/browser.js ***!
  \************************/
/*! exports provided: startBrowser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startBrowser", function() { return startBrowser; });
/* harmony import */ var puppeteer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! puppeteer */ "puppeteer");
/* harmony import */ var puppeteer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(puppeteer__WEBPACK_IMPORTED_MODULE_0__);


const getBrowser = async () => {
  console.log("Getting browser instance...");
  const browser = await puppeteer__WEBPACK_IMPORTED_MODULE_0___default.a.launch({
    headless: true,
    //headless: false,
    args: ["--disable-setuid-sandbox"],
    ignoreHTTPSErrors: true
  });
  console.log('Got the browser.');
  return browser;
};

const startBrowser = async () => {
  try {
    return getBrowser();
  } catch (err) {
    console.log("Could not create a browser instance => : ", err);
  }
};

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./browser */ "./src/browser.js");
/* harmony import */ var _pageController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pageController */ "./src/pageController.js");

 //Start the browser and create a browser instance

let browserInstance = Object(_browser__WEBPACK_IMPORTED_MODULE_0__["startBrowser"])(); // Pass the browser instance to the scraper controller
//scraperController.defaultExample(browserInstance)

const oneHour = 1000 * 60 * 60;
setInterval(() => _pageController__WEBPACK_IMPORTED_MODULE_1__["avitoExample"](browserInstance), oneHour);
/*
 * INFO
 *
 * 1) https://coderoad.ru/52918634/Node-js-Puppeteer-DOM-NodeList-%D0%BA-%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D1%83-JS
 */

/***/ }),

/***/ "./src/pageController.js":
/*!*******************************!*\
  !*** ./src/pageController.js ***!
  \*******************************/
/*! exports provided: defaultExample, avitoExample */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultExample", function() { return defaultExample; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "avitoExample", function() { return avitoExample; });
/* harmony import */ var _pageScraper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pageScraper */ "./src/pageScraper.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ "./src/api.js");



async function scrapeAll(browserInstance, scrapleFunction) {
  let browser;

  try {
    browser = await browserInstance;
    const data = await scrapleFunction(browser);
    console.log('scrapled FINISHED');
    console.log("scrapled data: ", data);
    await _api__WEBPACK_IMPORTED_MODULE_1__["uploadToDB"](data);
  } catch (err) {
    console.log("Could not resolve the browser instance => ", err);
  }

  await browser.close();
}

const defaultExample = browserInstance => scrapeAll(browserInstance, _pageScraper__WEBPACK_IMPORTED_MODULE_0__["defaultScraple"]);
const avitoExample = browserInstance => scrapeAll(browserInstance, _pageScraper__WEBPACK_IMPORTED_MODULE_0__["avitoScraple"]);

/***/ }),

/***/ "./src/pageScraper.js":
/*!****************************!*\
  !*** ./src/pageScraper.js ***!
  \****************************/
/*! exports provided: avitoScraple, defaultScraple */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "avitoScraple", function() { return avitoScraple; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultScraple", function() { return defaultScraple; });
const avitoScraple = async browser => {
  const urlCommon = "https://www.avito.ru/moskva_i_mo/tovary_dlya_kompyutera/komplektuyuschie/";
  const url_2070_0_35 = "videokarty-ASgBAgICAkTGB~pm7gmmZw?pmax=35000&q=2070";
  const url_Gtx_10_35 = "videokarty-ASgBAgICAkTGB~pm7gmmZw?pmax=35000&pmin=10000&q=gtx&s=104";
  const url = `${urlCommon}${url_Gtx_10_35}`;
  console.log(`Navigating to ${url} ... \n`);
  const page = await browser.newPage();
  await page.goto(url); // Wait for the required DOM to be rendered

  console.log(`rendering ... \n`);
  await page.waitForSelector("body div div[class*=titleStep"); // Get the link to all the required books

  const names = await page.$$eval("div > [class*=titleStep]", items => items.map(({
    innerText
  }) => innerText));
  await page.waitForSelector("div > [class*=item-root");
  const data = await page.$$eval("div > [class*=item-root]", elements => {
    elements = elements.map(element => {
      try {
        const id = element.getAttribute('id');
        const link = element.querySelector("[class*=link-link-]").getAttribute('href');
        const title = element.querySelector("[class*=titleStep]").innerText;
        const price = element.querySelector("[class*=price-text]").innerText;
        const timeAgo = element.querySelector("[class*=date-text]").innerText;
        const geo = element.querySelector("[class*=geo-root]").innerText;
        return {
          id,
          link,
          title,
          price,
          timeAgo,
          geo
        };
      } catch (e) {
        console.log("error", e);
      }

      return null;
    });
    return elements;
  });
  return data;
};
const defaultScraple = async browser => {
  const url = "http://books.toscrape.com";
  let page = await browser.newPage();
  console.log(`Navigating to ${url}...`);
  await page.goto(url); // Wait for the required DOM to be rendered

  await page.waitForSelector(".page_inner"); // Get the link to all the required books

  let urls = await page.$$eval("section ol > li", links => {
    // Make sure the book to be scraped is in stock
    links = links.filter(link => link.querySelector(".instock.availability > i").textContent !== "In stock"); // Extract the links from the data

    links = links.map(el => el.querySelector("h3 > a").href);
    return links;
  });
  console.log(urls); // Loop through each of those links, open a new page instance and get the relevant data from them

  let pagePromise = link => new Promise(async (resolve, reject) => {
    let dataObj = {};
    let newPage = await browser.newPage();
    await newPage.goto(link);
    dataObj["bookTitle"] = await newPage.$eval(".product_main > h1", text => text.textContent);
    dataObj["bookPrice"] = await newPage.$eval(".price_color", text => text.textContent);
    dataObj["noAvailable"] = await newPage.$eval(".instock.availability", text => {
      // Strip new line and tab spaces
      text = text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, ""); // Get the number of stock available

      let regexp = /^.*\((.*)\).*$/i;
      let stockAvailable = regexp.exec(text)[1].split(" ")[0];
      return stockAvailable;
    });
    dataObj["imageUrl"] = await newPage.$eval("#product_gallery img", img => img.src);
    dataObj["bookDescription"] = await newPage.$eval("#product_description", div => div.nextSibling.nextSibling.textContent);
    dataObj["upc"] = await newPage.$eval(".table.table-striped > tbody > tr > td", table => table.textContent);
    resolve(dataObj);
    await newPage.close();
  });

  for (link in urls) {
    let currentPageData = await pagePromise(urls[link]); // scrapedData.push(currentPageData);

    console.log(currentPageData);
  }
};

/***/ }),

/***/ "./src/parcingHelpers.js":
/*!*******************************!*\
  !*** ./src/parcingHelpers.js ***!
  \*******************************/
/*! exports provided: convertPriceToInt, convertIdToInt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertPriceToInt", function() { return convertPriceToInt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertIdToInt", function() { return convertIdToInt; });
const cleanToInt = (intStr, removeChar) => intStr.replace(removeChar, "").replace(/ /i, "");

const convertPriceToInt = priceStr => {
  const cleanPrice = cleanToInt(priceStr, "₽");
  const priceInt = Number(cleanPrice);
  return priceInt;
};
const convertIdToInt = idStr => {
  const cleanPrice = cleanToInt(idStr, "i");
  const priceInt = Number(cleanPrice);
  return priceInt;
};

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/nikita/js/puppeteer_avito/src/index.js */"./src/index.js");


/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("node-fetch");

/***/ }),

/***/ "puppeteer":
/*!****************************!*\
  !*** external "puppeteer" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("puppeteer");

/***/ })

/******/ });
//# sourceMappingURL=main.map