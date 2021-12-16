import { json, useLoaderData } from "remix";
import sanity from "~/lib/sanity.server";
import BlockContent from "~/components/BlockContent";
import markdown from "~/lib/markdown.server";

export function meta({ data }) {
  return {
    title: (data?.title || "Not Found") + " - Ben Borgers",
  };
}

import prismCss from "~/styles/prism.css";

export function links() {
  return [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/katex@0.15.1/dist/katex.min.css",
    },
    { rel: "stylesheet", href: prismCss },
  ];
}

export async function loader({ params }) {
  const fs = require("fs");
  const matter = require("gray-matter");

  const slug = params.slug.toLowerCase();

  const path = `./app/posts/${slug}.md`;
  if (fs.existsSync(path)) {
    const file = fs.readFileSync(path, "utf-8");
    const { data, content } = matter(file);

    return json({
      title: data.title,
      date: data.date,
      body: markdown(content),
    });
  }

  const result = await sanity.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug }
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

      <div className="border-l-2 border-sky-300 py-2 mt-2 -mx-4 sm:-mx-6 pl-5 sm:pl-7 bg-gray-50">
        <p className="text-gray-500 text-sm font-medium">
          {new Date(data.date).toLocaleString("en-US", {
            timeZone: "UTC",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="mt-6">
        {Array.isArray(data.body) ? (
          <BlockContent blocks={data.body} />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: data.body }}
            className="prose max-w-none"
          />
        )}
      </div>
    </>
  );
}
