import { useState, useEffect } from "react";
import { Link, useLoaderData, useFetcher } from "remix";
import redis from "~/lib/redis.server";
import { motion } from "framer-motion";
import { DateTime } from "luxon";
import launchBrowser from "~/lib/launchBrowser.server";

export let meta = { title: "Meal Swipes - Ben Borgers" };

export async function loader() {
  return JSON.parse(await redis.get("swipes"));
}

export async function action() {
  const browser = await launchBrowser();
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

  await page.close();
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
  const [data, setData] = useState(useLoaderData());

  const now = DateTime.now();

  const updatedMinsAgo = Math.round(
    now.diff(DateTime.fromMillis(data.timestamp), "minutes").toObject().minutes
  );

  const percentUsed = ((400 - data.swipes_left) / 400) * 100;

  const START_OF_SEMESTER = DateTime.fromObject({
    year: 2022,
    month: 1,
    day: 19,
  });
  const END_OF_SEMESTER = DateTime.fromObject({
    year: 2022,
    month: 5,
    day: 13,
  });

  const semesterTotalHours = END_OF_SEMESTER.diff(
    START_OF_SEMESTER,
    "hours"
  ).toObject().hours;
  const hoursSoFar = Math.max(
    0,
    now.diff(START_OF_SEMESTER, "hours").toObject().hours
  );
  const progressThroughSemester = hoursSoFar / semesterTotalHours;
  const swipesToBeOnTrack = progressThroughSemester * 400;
  const percentToBeOnTrack = (swipesToBeOnTrack / 400) * 100;

  // REVALIDATION
  // Update data every 30 seconds when tab is active,
  // and whenever the user returns to this tab.
  const fetcher = useFetcher();

  const revalidate = () => {
    if (document.visibilityState === "visible") {
      fetcher.load("/swipes");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      revalidate();
    }, 30 * 1000);

    document.addEventListener("visibilitychange", revalidate);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", revalidate);
    };
  }, []);

  useEffect(() => fetcher.data && setData(fetcher.data), [fetcher.data]);

  return (
    <div className="p-4 sm:p-6 h-screen grid grid-rows-[max-content,max-content,1fr]">
      <div className="max-w-xl">
        <h1 className="font-black text-3xl sm:text-5xl sm:leading-tight text-transparent bg-clip-text bg-gradient-to-br from-slate-900 to-slate-600">
          I want to use all of my ridiculously many meal swipes this semester.
        </h1>
        <h2 className="mt-2 text-slate-400 font-semibold">
          This will result in me buying a lot of granola bars.
        </h2>
      </div>

      <div className="mt-8 space-y-4 sm:space-y-8">
        <div className="shadow-lg rounded-xl h-16 sm:h-24 bg-white overflow-hidden border-4 border-slate-900 grid">
          <motion.div
            className="bg-gradient-to-r from-sky-200 to-cyan-400 h-full col-start-1 row-start-1"
            initial={{ width: 0 }}
            animate={{ width: percentUsed + "%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
          />

          <motion.p
            className="font-bold text-sky-900 col-start-1 row-start-1 ml-4 self-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            swipes used so far ({400 - data.swipes_left}/400)
          </motion.p>
        </div>

        <div className="shadow-lg rounded-xl h-16 sm:h-24 bg-white overflow-hidden border-4 border-slate-900 grid">
          <motion.div
            className="bg-gradient-to-r from-slate-200 to-slate-300 h-full col-start-1 row-start-1"
            initial={{ width: 0 }}
            animate={{ width: percentToBeOnTrack + "%" }}
            transition={{
              type: "spring",
              bounce: 0,
              duration: 0.5,
              delay: 0.15,
            }}
          />

          <motion.p
            className="font-bold text-slate-900 col-start-1 row-start-1 ml-4 self-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            ideal swipes to be on track (
            {Math.round(swipesToBeOnTrack * 10) / 10}/400)
          </motion.p>
        </div>
      </div>

      <div className="self-end flex flex-col sm:flex-row items-end justify-between gap-1">
        <div className="bg-red-500 text-white text-sm font-medium px-3 py-0.5 rounded-full flex items-center gap-2">
          <div className="relative h-2 w-2">
            <div className="absolute inset-0 bg-white/90 rounded-full" />
            <div className="absolute inset-0 bg-white/90 rounded-full animate-ping" />
          </div>
          <p>
            last checked{" "}
            {updatedMinsAgo === 0
              ? "just now"
              : `${updatedMinsAgo} ${
                  updatedMinsAgo === 1 ? "min" : "mins"
                } ago`}
          </p>
        </div>

        <p className="text-right text-slate-500">
          An aspirational project by{" "}
          <Link to="/" prefetch="intent" className="underline">
            Ben Borgers
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
