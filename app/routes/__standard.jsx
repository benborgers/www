import { NavLink, Outlet } from "remix";

export default function () {
  return (
    <div className="p-4 pb-24 text-neutral-700">
      <div className="max-w-[42rem] mx-auto">
        <Outlet />
      </div>
    </div>
  );
}
