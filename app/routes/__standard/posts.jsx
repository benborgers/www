import { json, Link, useLoaderData } from "remix";
import getPosts from "~/lib/getPosts.server";

export let meta = () => ({
  title: "Ben Borgers’ blog posts",
});

export async function loader() {
  return json({
    posts: await getPosts(),
  });
}

export default function () {
  const data = useLoaderData();

  return (
    <>
      {data.posts.map((data) => (
        <Link to={`/posts/${data.slug}`} key={data.slug} className="block">
          {data.title}
        </Link>
      ))}
    </>
  );
}
