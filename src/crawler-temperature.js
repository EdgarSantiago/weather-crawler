// @ts-nocheck
import {
  launchPuppeteer,
  setupPage,
  navigateToURL,
} from "./crawler/browser.js";

import extractLinks from "./crawler/extract-links.js";

const main = async () => {
  const letter = "j";
  const browser = await launchPuppeteer();
  const page = await setupPage(browser);

  const targetURL = "https://g1.globo.com/previsao-do-tempo/indice/";
  await navigateToURL(page, targetURL);

  // Wait for the section with the specified letter to be visible
  await page.waitForSelector(
    `section[data-label="${letter}"][id="index-${letter}"]`
  );

  // Use Promise.all to extract both text content and href attributes
  const [textLinks, links2] = await Promise.all([
    page.evaluate((letter) => {
      const section = document.querySelector(
        `section[data-label="${letter}"][id="index-${letter}"]`
      );
      const span = section.querySelector("header span");
      return span.textContent;
    }, letter),

    page.evaluate((letter) => {
      const section = document.querySelector(
        `section[data-label="${letter}"][id="index-${letter}"]`
      );
      const aElements = section.querySelectorAll("a");
      return Array.from(aElements, (a) => a.href);
    }, letter),
  ]);

  console.log("Text Content:", textLinks);
  console.log("Links:", links2);

  // Close the browser when you're done
  await browser.close();
};

// Call the main function to start the process
main();
