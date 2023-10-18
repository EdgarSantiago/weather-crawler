// @ts-nocheck

const extractLinks = async (page) => {
  const spanElementTemperature = await page.waitForSelector("div > span.-bold");
  const temperature = await spanElementTemperature.evaluate(
    (span) => span.textContent
  );
  console.log("Temperature:", temperature);
};

export default { extractLinks };
