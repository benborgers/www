import { json, useLoaderData } from "remix";
import sanity from "~/lib/sanity.server";
import BlockContent from "~/components/BlockContent";

export function meta({ data }) {
  return {
    title: (data?.title || "Not Found") + " - Ben Borgers",
  };
}

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/katex@0.15.1/dist/katex.min.css",
    },
  ];
}

export async function loader({ params }) {
  const result = await sanity.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug: params.slug.toLowerCase() }
  );

  if (!result) {
    throw new Response("", { status: 404 });
  }

  return json(result);
}

export default function () {
  const data = useLoaderData();

  return (
    <>
      <h1 className="font-serif text-3xl">{data.title}</h1>

      <div className="border-l-2 border-sky-300 py-2 mt-2 -ml-6 -mr-6 pl-7 bg-gray-50">
        <p className="text-gray-500 text-sm font-medium">
          {new Date(data.date).toLocaleString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="mt-6">
        <BlockContent blocks={data.body} />
      </div>
    </>
  );
}
