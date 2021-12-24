import { Link, Outlet, useLocation } from "remix";
import NavLinks from "~/components/NavLinks";

export default function () {
  const location = useLocation();

  const noPadding = location.pathnamne === "/contact";

  return (
    <div className="text-neutral-700">
      {location.pathname !== "/" && (
        <nav className="p-4 bg-white/80 backdrop-blur-lg sticky inset-x-0 top-0 border-b border-neutral-900/10">
          <div className="max-w-[42rem] mx-auto flex justify-between">
            <Link
              to="/"
              className="block text-neutral-900 font-semibold tracking-tighter"
            >
              Ben Borgers
            </Link>

            <NavLinks />
          </div>
        </nav>
      )}

      <div className={noPadding ? "" : "p-4 pb-24"}>
        <div className="max-w-[42rem] mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
