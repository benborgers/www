const TONTINE_PASSWORD = process.env.TONTINE_PASSWORD;
const JUMBOCASH_PASSWORD = process.env.JUMBOCASH_PASSWORD;

const puppeteer = require("puppeteer");
const fetch = require("node-fetch");

const launchBrowser = async (debug = false) => {
  // Turn `headless` to `false` for debugging.
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: debug ? false : true,
  });

  return browser;
};

const tontine = async () => {
  console.log("RUNNING: tontine");

  const browser = await launchBrowser();
  const page = await browser.newPage();
  // Tontine shows different UI on mobile, so force desktop.
  await page.setViewport({ width: 1200, height: 800 });

  await page.goto("https://tontine.cash");
  await page.waitForSelector("button");
  await page.waitForTimeout(2000); // So MSCHF cover will go away.
  await page.evaluate(() => {
    document.querySelectorAll("button").forEach((button) => {
      if (button.innerText.toLowerCase().includes("login")) {
        button.click();
      }
    });
  });

  await page.type('input[placeholder="email"]', "ben@elk.sh");
  await page.type('input[placeholder="password"]', TONTINE_PASSWORD);
  await page.click("button.login-btn");
  await page.waitForTimeout(1000);

  await page.evaluate(() => {
    document.querySelectorAll("button").forEach((button) => {
      if (button.innerText.toLowerCase().includes("alive")) {
        button.click();
      }
    });
  });

  await page.waitForTimeout(2000);

  await page.waitForSelector(".complete");

  await page.close();
  await browser.close();
};

const swipes = async () => {
  console.log("RUNNING: swipes");

  const browser = await launchBrowser();
  const page = await browser.newPage();

  await page.goto("https://www.jumbocash.net/login.php");
  await page.waitForSelector("#loginphrase");
  await page.type("#loginphrase", "1370784");
  await page.type("#password", JUMBOCASH_PASSWORD);
  await page.click('input[type="submit"]');
  await page.waitForSelector(".jsa_transactions"); // Wait for account page to load.

  const rawSwipes = await page.evaluate(
    () => document.querySelector("table:last-of-type tbody .sr-only").innerText
  );
  const swipes = parseInt(rawSwipes.replace("Current Balance", "").trim());
  console.log(`${swipes} swipes left`);

  fetch("https://benborgers.com/swipes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ swipes_left: swipes }),
  });

  await page.close();
  await browser.close();
};

// tontine();
swipes();
