// @ts-nocheck

import puppeteer from "puppeteer";

const launchPuppeteer = async () => {
  const browser = await puppeteer.launch({
    timeout: 100000,
    headless: "new", // Launch the browser with a visible GUI.
  });
  return browser;
};

// Function to open a new page and set up the geolocation
const setupPage = async (browser) => {
  const page = await browser.newPage();

  await page.setViewport({
    width: 580,
    height: 800,
  });

  await page.evaluateOnNewDocument(function () {
    navigator.geolocation.getCurrentPosition = function (cb) {
      setTimeout(() => {
        // @ts-ignore
        cb({
          coords: {
            accuracy: 21,
            altitude: null,
            altitudeAccuracy: null,
            heading: null,
            latitude: 23.129163,
            longitude: 113.264435,
            speed: null,
          },
        });
      }, 1000);
    };
  });

  return page;
};

const navigateToURL = async (page, url) => {
  await page.goto(url);
};

export { launchPuppeteer, setupPage, navigateToURL };
