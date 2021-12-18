import { useLoaderData } from "remix";
import puppeteer from "puppeteer";
import redis from "~/lib/redis.server";

export let meta = { title: "Meal Swipes - Ben Borgers" };
export let handle = { hydrate: false };

export async function loader() {
  return JSON.parse(await redis.get("swipes"));
}

export async function action() {
  // Turn `headless` to `true` for debugging.
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto("https://www.jumbocash.net/login.php");
  await page.waitForSelector("#loginphrase");
  await page.type("#loginphrase", "1370784");
  await page.type("#password", process.env.JUMBOCASH_PASSWORD);
  await page.click('input[type="submit"]');
  await page.waitForSelector(".jsa_transactions"); // Wait for account page to load.

  const rawSwipes = await page.evaluate(
    () => document.querySelector("table:last-of-type tbody .sr-only").innerText
  );
  const swipes = parseInt(rawSwipes.replace("Current Balance", "").trim());

  await browser.close();

  await redis.set(
    "swipes",
    JSON.stringify({
      timestamp: new Date().getTime(),
      swipes_left: swipes,
    })
  );

  return null;
}

export default function () {
  const data = useLoaderData();

  const minsAgo = Math.floor(
    Math.round((new Date().getTime() - data.timestamp) / (1000 * 60))
  );

  return (
    <div className="p-4 text-center h-[90vh] grid place-items-center">
      <div>
        <div className="max-w-max mx-auto px-3 py-1 rounded-full bg-red-500 flex items-center space-x-1.5">
          <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
          <p className="text-white text-sm font-semibold">
            updated{" "}
            {minsAgo === 0
              ? "just now"
              : `${minsAgo} ${minsAgo === 1 ? "min" : "mins"} ago`}
          </p>
        </div>

        <p className="mt-4 text-3xl font-black text-gray-900">
          Ben has used{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-blue-600">
            {400 - data.swipes_left}/400
          </span>{" "}
          swipes this semester.
        </p>
        <p className="mt-2 text-gray-500">
          Next semester, I will try to use them all.
        </p>
      </div>
    </div>
  );
}
