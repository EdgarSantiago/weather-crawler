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

  const { textLinks, links, data } = await page.evaluate((letter) => {
    const section = document.querySelector(
      `section[data-label="${letter}"][id="index-${letter}"]`
    );
    const aElements = section.querySelectorAll("a");

    const data = Array.from(aElements, (a) => ({
      textContent: a.textContent,
      href: a.href,
    }));

    return {
      textLinks: data.map((item) => item.textContent),
      links: data.map((item) => item.href),
      data: data,
    };
  }, letter);

  console.log("data:", data);

  // Close the browser when you're done
  await browser.close();
};

// Call the main function to start the process
main();
