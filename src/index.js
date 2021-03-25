import {startBrowser} from './browser';
import * as scraperController from './pageController';

//Start the browser and create a browser instance
let browserInstance = startBrowser();

// Pass the browser instance to the scraper controller
//scraperController.defaultExample(browserInstance)

const oneHour = 1000 * 60 * 60;

setInterval(() => scraperController.avitoExample(browserInstance), oneHour);

/*
 * INFO
 *
 * 1) https://coderoad.ru/52918634/Node-js-Puppeteer-DOM-NodeList-%D0%BA-%D0%BE%D0%B1%D1%8A%D0%B5%D0%BA%D1%82%D1%83-JS
 */
