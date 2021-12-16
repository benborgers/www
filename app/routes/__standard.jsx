import { Link, Outlet, useLocation } from "remix";

export default function () {
  const location = useLocation();

  const links = {
    "Ben Borgers": "/",
    Blog: "/posts",
    Contact: "/contact",
    Twitter: "https://twitter.com/benborgers",
  };

  return (
    <div className="p-2 sm:p-6 pb-24 sm:pb-24">
      <div className="w-full max-w-[44rem] mx-auto">
        <div className="flex space-x-4">
          {Object.keys(links).map((label) => {
            const El = links[label].startsWith("/") ? Link : "a";

            return (
              <El
                to={links[label]}
                prefetch="intent"
                href={links[label]}
                key={label}
                className={`block px-3 py-2 border rounded-lg
                  ${
                    location.pathname === links[label]
                      ? "text-sky-700 border-sky-200 bg-sky-50"
                      : "text-gray-600 border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors duration-150"
                  }`}
              >
                {label}
              </El>
            );
          })}
        </div>

        <div className="bg-white p-4 sm:p-6 shadow-lg border border-gray-100 rounded-xl mt-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
