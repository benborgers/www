import { json, useLoaderData, Link } from "remix";
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
      <div className="mt-12 sm:mt-28" />

      <div className="border border-neutral-900 rounded-xl overflow-hidden">
        <h1 className="text-white text-lg font-semibold tracking-tighter bg-neutral-900 px-4 py-3">
          {data.title}
        </h1>
        <p className="text-neutral-500 tracking-tighter px-4 py-3">
          {new Date(data.date).toLocaleString("en-US", {
            timeZone: "UTC",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="mt-8">
        {Array.isArray(data.body) ? (
          <BlockContent blocks={data.body} />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: data.body }}
            className="prose max-w-none prose-neutral prose-a:font-normal prose-a:text-inherit"
          />
        )}
      </div>

      <div className="mt-12 border border-neutral-900 rounded-xl overflow-hidden p-4">
        <p className="text-neutral-600">
          <strong className="text-neutral-900 font-semibold">
            A quick favor:
          </strong>{" "}
          was anything I wrote incorrect or misspelled, or do you still have
          questions? Please{" "}
          <Link to="/contact" className="underline">
            use this contact form
          </Link>{" "}
          to let me know or ask for help!
        </p>
      </div>
    </>
  );
}
