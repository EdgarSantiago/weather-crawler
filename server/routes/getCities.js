import { Router } from "express";
import {
  launchPuppeteer,
  setupPage,
  navigateToURL,
} from "../crawler/browser.js";

const getCities = Router();

getCities.get("/cities/:letter", async (req, res) => {
  try {
    const letter = req.params.letter;
    const browser = await launchPuppeteer();
    const page = await setupPage(browser);

    const targetURL = "https://g1.globo.com/previsao-do-tempo/indice/";
    await navigateToURL(page, targetURL);

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

    await browser.close();

    res.json(data); // Send the data as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while scraping data." });
  }
});

export default getCities;
