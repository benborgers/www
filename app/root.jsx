import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useMatches,
  Link,
} from "remix";
import { useEffect } from "react";

import tailwindStylesUrl from "~/styles/tailwind-build.css";
import customStylesUrl from "~/styles/custom.css";

export function links() {
  return [
    { rel: "stylesheet", href: tailwindStylesUrl },
    { rel: "stylesheet", href: customStylesUrl },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Fraunces:wght@400&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://rsms.me/inter/inter.css",
    },
  ];
}

export default function App() {
  useEffect(() => {
    // I'm not sure what the SEO implications of having the
    // same content on two domains is, so I'm redirecting.
    if (window.location.href.startsWith("https://ben.cv")) {
      window.location = window.location.href.replace(
        "https://ben.cv",
        "https://benborgers.com"
      );
    }
  }, []);

  return (
    <Document>
      <Outlet />
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <Document title="Error!">
      <div className="mt-[30vh] text-center">
        <h1 className="text-4xl font-black text-red-500">Unexpected error!</h1>

        <p className="mt-2 p-2 rounded-lg text-red-600 font-mono bg-red-100 max-w-prose mx-auto">
          {error.message}
        </p>

        <p className="mt-2 text-lg text-gray-700">
          Sorry! Please{" "}
          <Link to="/contact" className="underline decoration-gray-300">
            report this error to me
          </Link>
          .
        </p>
      </div>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <div className="mt-[30vh] text-center">
        <h1 className="text-4xl font-black text-red-500">
          {caught.status}: {caught.statusText}
        </h1>

        <p className="mt-2 text-lg text-gray-700">
          Sorry about that! Try returning to the{" "}
          <Link to="/" className="underline decoration-gray-300">
            homepage
          </Link>
          .
        </p>
      </div>
    </Document>
  );
}

function Document({ children, title, bgClass = null }) {
  const matches = useMatches();

  const internalBgClass =
    bgClass || matches.find((match) => match.handle?.bgClass)?.handle?.bgClass;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        {title ? <title>{title}</title> : null}
        <link rel="icon" href="https://emojicdn.elk.sh/🐙" />
        <Links />
      </head>
      <body
        className={`text-gray-700 antialiased ${
          internalBgClass ? internalBgClass : "bg-white"
        }`}
      >
        {children}
        <ScrollRestoration />
        <Scripts />
        <script
          src="https://owl.benborgers.com/script.js"
          data-spa="auto"
          data-site="ZWCPJCUA"
          data-included-domains="benborgers.com,ben.cv"
          defer
        ></script>
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
