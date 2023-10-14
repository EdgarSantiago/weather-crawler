// @ts-nocheck
import express from "express";
import puppeteer from "puppeteer";

const app = express();
const port = 3000;

app.get("/temperature/:city", async (req, res) => {
  const { city } = req.params;
  console.log(city);
  try {
    const browser = await puppeteer.launch({
      headless: "new",
    });
    const page = await browser.newPage();

    await page.evaluateOnNewDocument(function () {
      navigator.geolocation.getCurrentPosition = function (cb) {
        setTimeout(() => {
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

    await page.goto(
      "https://www.climatempo.com.br/previsao-do-tempo/agora/cidade/558/saopaulo-sp"
    );

    const spanElementTemperature = await page.waitForSelector(
      "div > span.-bold"
    );
    const temperature = await spanElementTemperature.evaluate(
      (span) => span.textContent
    );
    console.log(temperature);

    browser.close();

    res.json({ temperature: temperature });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching temperature data." });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
