import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useMatches,
} from "remix";

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
      <div>
        <h1>There was an error</h1>
        <p>{error.message}</p>
        <hr />
        <p>Sorry! Please report this error via email to ben@elk.sh</p>
      </div>
    </Document>
  );
}

// https://remix.run/docs/en/v1/api/conventions#catchboundary
export function CatchBoundary() {
  let caught = useCatch();

  let message;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      );
      break;
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      );
      break;

    default:
      throw new Error(caught.data || caught.statusText);
  }

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <h1>
        {caught.status}: {caught.statusText}
      </h1>
      {message}
    </Document>
  );
}

function Document({ children, title }) {
  const matches = useMatches();

  const noScript = matches.some((match) => match.handle?.hydrate === false);

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
      <body className="bg-white text-gray-700 antialiased">
        {children}
        <ScrollRestoration />
        {!noScript && <Scripts />}
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
