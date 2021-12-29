import type { ActionFunction } from "remix";
import launchBrowser from "~/lib/launchBrowser.server";

export const action: ActionFunction = async () => {
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
  await page.type(
    'input[placeholder="password"]',
    process.env.TONTINE_PASSWORD as string
  );
  await page.click("button.login-btn");
  await page.waitForTimeout(1000);

  await page.evaluate(() => {
    document.querySelectorAll("button").forEach((button) => {
      if (button.innerText.toLowerCase().includes("alive")) {
        // Testing that the ".complete" check below fails if we
        // don't click this. (It could be that Tontine has the
        // ".complete" class even before we click the button.)
        // Un-comment this once we're sure that this cron job
        // fails is we don't click the button.
        // button.click();
      }
    });
  });

  await page.waitForTimeout(2000);

  await page.waitForSelector(".complete");

  await browser.close();

  return null;
};
