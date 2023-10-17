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

    // Extract the textContent for probabily of rain
    const probOfRain = await page.$(".forecast-today-detail__item-value");
    const probOfRainTextContent = await page.evaluate(
      (span) => span.textContent,
      probOfRain
    );
    console.log("Probabily of rain:", probOfRainTextContent);

    // Select all elements with the class "forecast-today-detail__item-value"
    const probOfRainElements = await page.$$(
      ".forecast-today-detail__item-value"
    );

    // Extract the textContent for each element
    const probOfRainTextContents = await Promise.all(
      probOfRainElements.map(async (element) => {
        return await page.evaluate((span) => span.textContent, element);
      })
    );

    // Extracted text contents

    // Define the keys for each value
    const keys = [
      "Prob. de Chuva",
      "Nascer do Sol",
      "Pôr do Sol",
      "Vento",
      "Raios UV",
      "Umidade",
    ];

    // Create a JSON object
    const probOfRainJSON = {};

    // Populate the JSON object with keys and values
    keys.forEach((key, index) => {
      probOfRainJSON[key] = probOfRainTextContents[index].trim();
    });

    // Log the JSON object
    console.log("Probabilities of Rain (JSON):", probOfRainJSON);

    // Close the browser when you're done
    await browser.close();
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Call the main function to start the process
main();
