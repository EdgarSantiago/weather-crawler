import { Router } from "express";
import {
  launchPuppeteer,
  setupPage,
  navigateToURL,
} from "../crawler/browser.js";

const searchCity = Router();

searchCity.get("/searchcity/:name", async (req, res) => {
  console.log("searchcity");
  try {
    const cityName = req.params.name.toLowerCase(); // Converte o input para lowercase
    const browser = await launchPuppeteer();
    const page = await setupPage(browser);

    const targetURL = "https://g1.globo.com/previsao-do-tempo/indice/";
    await navigateToURL(page, targetURL);

    const data = await page.evaluate((cityName) => {
      const aElements = document.querySelectorAll("a");

      for (let a of aElements) {
        if (a.textContent.toLowerCase().includes(cityName)) {
          // Convert text content to lowercase for comparison
          return {
            textContent: a.textContent,
            href: a.href,
          };
        }
      }
      return null; // City not found
    }, cityName);

    await browser.close();

    if (data) {
      console.log("data:", data);
      res.json({ data }); // Send the data as a JSON response
    } else {
      res.status(404).json({ error: "City not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while scraping data." });
  }
});

export default searchCity;
