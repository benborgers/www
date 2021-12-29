import puppeteer from "puppeteer";

export default async function launchBrowser() {
  // Turn `headless` to `false` for debugging.
  const browser = await puppeteer.launch({
    // These args are to avoid running out of memory: https://stackoverflow.com/a/62396078
    args: ["--no-sandbox", "--no-zygote", "--single-process"],
    headless: true,
  });

  return browser;
}
