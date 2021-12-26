import { MetaFunction, LoaderFunction, HeadersFunction } from "remix";
import { json, useLoaderData } from "remix";
import { DateTime } from "luxon";
import { motion } from "framer-motion";

export const meta: MetaFunction = () => ({ title: "benborgers/dashboard" });
export const headers: HeadersFunction = () => ({
  "WWW-Authenticate": "Basic",
});
export const handle = { bgClass: "bg-gray-100" };

type LoaderData = {
  authorized: boolean;
  harvestTimeEntries?: Array<{ hours: number; billable_rate: number }>;
};

export const loader: LoaderFunction = async ({ request }) => {
  if (!isAuthorized(request)) {
    return json<LoaderData>({ authorized: false }, { status: 401 });
  }

  const monday = DateTime.now().setZone("America/New_York").startOf("week");

  const harvestData = await (
    await fetch(
      `https://api.harvestapp.com/v2/time_entries?from=${monday.toISO()}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.HARVEST_TOKEN}`,
          "Harvest-Account-Id": "1339826",
          "User-Agent": "Ben Borgers Dashboard (benborgers@hey.com)",
        },
      }
    )
  ).json();

  return json<LoaderData>({
    authorized: true,
    harvestTimeEntries: harvestData.time_entries,
  });
};

const WEEKLY_INCOME_GOAL = (390 * 12) / 52; // Weekly rent for the office.

export default function () {
  const data: LoaderData = useLoaderData();

  if (!data.authorized) {
    return (
      <div className="p-4 text-gray-900">
        <p className="font-mono">
          You don’t have permission to view this page.
        </p>
      </div>
    );
  }

  const incomeThisWeek =
    data.harvestTimeEntries?.reduce((accumulator, entry) => {
      return accumulator + entry.hours * entry.billable_rate;
    }, 0) || 0;

  return (
    <div className="p-6 min-h-screen">
      <div className="h-24 bg-white w-full rounded-xl border-2 border-white shadow-lg overflow-hidden grid">
        <motion.div
          className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full col-start-1 row-start-1"
          initial={{ width: 0 }}
          animate={{
            width:
              Math.min(100, (incomeThisWeek / WEEKLY_INCOME_GOAL) * 100) + "%",
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.5 }}
        />

        <motion.div
          className="col-start-1 row-start-1 self-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <p className="font-bold text-white">
            Freelancing income this week: {formatMoney(incomeThisWeek)}
          </p>
          <p className="text-sm font-medium text-white/60">
            Goal is {formatMoney(WEEKLY_INCOME_GOAL)} per week, to cover rent
            for the office.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

const isAuthorized = (request: Request): boolean => {
  const header = request.headers.get("Authorization");

  if (!header) {
    return false;
  }

  const base64 = header.replace("Basic ", "");
  const [username, password] = Buffer.from(base64, "base64")
    .toString()
    .split(":");

  return username === "ben" && password === process.env.DASHBOARD_PASSWORD;
};

const formatMoney = (number: number): string => {
  return (
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    })
      .format(number)
      // Remove ".00" at the end.
      .replace(/\.00$/, "")
  );
};
