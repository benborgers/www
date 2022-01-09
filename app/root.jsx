import { useEffect, useRef } from "react";
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
  useTransition,
} from "remix";

import tailwindStylesUrl from "~/generated/tailwind-build.css";
import customStylesUrl from "~/styles/custom.css";

export function links() {
  return [
    { rel: "stylesheet", href: tailwindStylesUrl },
    { rel: "stylesheet", href: customStylesUrl },
    {
      rel: "stylesheet",
      href: "https://rsms.me/inter/inter.css",
    },
  ];
}

export default function App() {
  const transition = useTransition();
  const bar = useRef();

  // Fake loading bar.
  useEffect(() => {
    if (transition.state === "idle") {
      bar.current.style.width = "100%";
      setTimeout(() => {
        bar.current.style.opacity = 0;
        // Technically, fading out the bar should take 200ms,
        // so we wait until it's fully gone to bring the bar
        // back to 0%. In practice, this seems to only be a
        // concern on iOS Safari.
        setTimeout(() => {
          bar.current.style.width = "0%";
        }, 300);
      }, 200);
    } else {
      bar.current.style.opacity = 1;
      bar.current.style.width = "15%";
    }
  }, [transition.state]);

  return (
    <Document>
      <div
        className="fixed inset-x-0 top-0 z-50 h-0.5 bg-sky-400 shadow shadow-sky-400/30 w-0 opacity-0 transition-all duration-200"
        ref={bar}
      />
      <Outlet />
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#errorboundary
export function ErrorBoundary({ error }) {
  console.error(error);
  return (
    <Document title="Unexpected Error">
      <div className="h-screen grid place-items-center p-4">
        <div className="border border-neutral-900 rounded-xl overflow-hidden w-full max-w-sm mx-auto">
          <h1 className="text-white text-lg font-semibold bg-neutral-900 px-4 py-3">
            Unexpected Error
          </h1>
          <div className="divide-y divide-neutral-900">
            <p className="px-4 py-3 font-mono text-neutral-500 overflow-scroll max-h-20">
              {error.message}
            </p>
            <p className="text-neutral-600 px-4 py-3">
              Sorry! Please{" "}
              <Link to="/contact" prefetch="intent" className="underline">
                report this error to me
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  return (
    <Document title={`${caught.statusText}`}>
      <div className="h-screen grid place-items-center p-4">
        <div className="border border-neutral-900 rounded-xl overflow-hidden w-full max-w-sm mx-auto">
          <h1 className="text-white text-lg font-semibold bg-neutral-900 px-4 py-3">
            {caught.status}: {caught.statusText}
          </h1>
          <p className="text-neutral-600 px-4 py-3">
            Sorry! Please try{" "}
            <Link to="/" prefetch="intent" className="underline">
              returning to the homepage
            </Link>
            . If you clicked on a link to get here, please{" "}
            <Link to="/contact" prefetch="intent" className="underline">
              report the broken link
            </Link>
            .
          </p>
        </div>
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
        {title ? <title>{title}</title> : null}
        <Meta />
        <link rel="icon" href="https://emojicdn.elk.sh/🐙" />
        <Links />
      </head>
      <body
        className={`antialiased ${
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
          data-included-domains="benborgers.com"
          defer
        ></script>
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
