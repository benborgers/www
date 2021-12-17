import { useLoaderData } from "remix";

export let meta = { title: "Meal Swipes - Ben Borgers" };
export let handle = { hydrate: false };

export async function loader() {
  return null;
}

export default function () {
  const data = useLoaderData();

  return (
    <div className="p-4 text-center h-[90vh] grid place-items-center">
      <div>
        <p className="text-3xl font-black text-gray-900 max-w-screen-sm text-left">
          This page is temporarily down because I think I locked myself out of
          my JumboCash account — oops.
        </p>
        {/* <div className="max-w-max mx-auto px-3 py-1 rounded-full bg-red-500 flex items-center space-x-1.5">
          <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
          <p className="text-white text-sm font-semibold">Live</p>
        </div>

        <p className="mt-4 text-3xl font-black text-gray-900">
          Ben has used{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-sky-400 to-blue-600">
            {400 - data.swipesLeft}/400
          </span>{" "}
          swipes this semester.
        </p>
        <p className="mt-2 text-gray-500">
          Next semester, I will try to use them all.
        </p> */}
      </div>
    </div>
  );
}
