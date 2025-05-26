import { getCollection, getEntry, type CollectionEntry } from "astro:content";

export const getPosts = async ({
  includeUnlisted,
}: {
  includeUnlisted: boolean;
}): Promise<CollectionEntry<"posts">[]> => {
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
};

export const getPost = async (slug: string) => {
  return await getEntry("posts", slug);
};
