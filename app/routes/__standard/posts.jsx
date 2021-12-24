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
    <div className="space-y-3 sm:space-y-2">
      {data.posts.map((post) => (
        <Link
          to={post.slug}
          prefetch="intent"
          key={post.slug}
          className="block sm:flex sm:justify-between sm:gap-4 group"
        >
          <p className="text-gray-800 underline decoration-transparent group-hover:decoration-gray-400 transition-all">
            {post.title}
          </p>
          <p className="text-gray-400">
            {new Date(post.date).toLocaleString("en-US", {
              timeZone: "UTC",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </Link>
      ))}
    </div>
  );
}
