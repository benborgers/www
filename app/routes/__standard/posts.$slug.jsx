import { json, useLoaderData } from "remix";
import sanity from "~/lib/sanity.server";

export function meta({ data }) {
  return {
    title: data.title + " - Ben Borgers",
  };
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
    </>
  );
}
