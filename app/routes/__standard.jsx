import { Link, NavLink, Outlet, useLocation } from "remix";

export default function () {
  const location = useLocation();

  return (
    <div className="text-neutral-700">
      {location.pathname !== "/" && (
        <nav className="px-4 py-3 bg-white/80 backdrop-blur-lg sticky inset-x-0 top-0 border-b border-neutral-900/10">
          <div className="max-w-[42rem] mx-auto">
            <Link
              to="/"
              className="block text-neutral-900 font-semibold tracking-tighter"
            >
              Ben Borgers
            </Link>
          </div>
        </nav>
      )}

      <div className="p-4 pb-24 ">
        <div className="max-w-[42rem] mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
