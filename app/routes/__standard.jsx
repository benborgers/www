import { Outlet } from "remix";

export default function () {
  return (
    <div className="max-w-prose mx-auto p-2 sm:p-6 pb-24 sm:pb-24">
      <div className="p-4 sm:p-6 shadow-lg border border-gray-100 rounded-xl">
        <Outlet />
      </div>
    </div>
  );
}
