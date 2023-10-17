// @ts-nocheck
import {
  launchPuppeteer,
  setupPage,
  navigateToURL,
} from "./crawler/browser.js";

const main = async () => {
  try {
    // Launch Puppeteer and set up the page
    const browser = await launchPuppeteer();
    const page = await setupPage(browser);

    const targetURL =
      "https://g1.globo.com/previsao-do-tempo/mg/almenara.ghtml";

    // Navigate to the target URL
    await navigateToURL(page, targetURL);

    // Wait for the temperature elements to be visible
    await page.waitForSelector(".forecast-today__temperature--max", {
      timeout: 60000,
    });
    await page.waitForSelector(".forecast-today__temperature--min", {
      timeout: 60000,
    });

    // Extract the textContent for maximum temperature
    const temperatureMax = await page.$(".forecast-today__temperature--max");
    const temperatureMaxTextContent = await page.evaluate(
      (div) => div.textContent,
      temperatureMax
    );
    console.log("Temperature max:", temperatureMaxTextContent);

    // Extract the textContent for minimum temperature
    const temperatureMin = await page.$(".forecast-today__temperature--min");
    const temperatureMinTextContent = await page.evaluate(
      (div) => div.textContent,
      temperatureMin
    );
    console.log("Temperature min:", temperatureMinTextContent);

    // Extract the textContent for minimum temperature
    const temperatureMin = await page.$(".forecast-today__temperature--min");
    const temperatureMinTextContent = await page.evaluate(
      (div) => div.textContent,
      temperatureMin
    );
    console.log("Temperature min:", temperatureMinTextContent);

    // Close the browser when you're done
    await browser.close();
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Call the main function to start the process
main();
