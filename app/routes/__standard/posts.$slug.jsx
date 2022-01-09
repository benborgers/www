import { json, useLoaderData, Link } from "remix";
import posts from "~/generated/posts.json";

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
  const slug = params.slug.toLowerCase();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    throw new Response("", { status: 404 });
  }

  return json(post);
}

export default function () {
  const post = useLoaderData();

  return (
    <>
      <div className="mt-12 sm:mt-28" />

      <div className="border border-neutral-900 rounded-xl overflow-hidden">
        <h1 className="text-white text-lg font-semibold bg-neutral-900 px-4 py-3">
          {post.title}
        </h1>
        <p className="text-neutral-500 tracking-tight px-4 py-3">
          {new Date(post.date).toLocaleString("en-US", {
            timeZone: "UTC",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>

      <div className="mt-8">
        <div
          dangerouslySetInnerHTML={{ __html: post.html }}
          className="prose max-w-none prose-neutral prose-a:font-normal prose-a:text-inherit prose-img:mx-auto"
        />
      </div>

      <div className="mt-12 border border-neutral-900 rounded-xl overflow-hidden p-4">
        <p className="text-neutral-600">
          <strong className="text-neutral-900 font-semibold">
            A quick favor:
          </strong>{" "}
          was anything I wrote incorrect or misspelled, or do you have any
          questions? Please{" "}
          <Link to="/contact" prefetch="intent" className="underline">
            use this contact form
          </Link>{" "}
          to let me know!
        </p>
      </div>
    </>
  );
}
