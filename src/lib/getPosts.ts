import { getCollection, type CollectionEntry } from "astro:content";

export default async function getPosts({
  includeUnlisted,
}: {
  includeUnlisted: boolean;
}): Promise<CollectionEntry<"posts">[]> {
  return (await getCollection("posts"))
    .filter((post) => {
      if (post.data.unlisted && !includeUnlisted) return false;
      return true;
    })
    .filter((post) => {
      if (post.data.draft && !import.meta.env.DEV) return false;
      return true;
    })
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
