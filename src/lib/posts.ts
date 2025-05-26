import { getCollection, type CollectionEntry } from "astro:content";

const getEpoch = (date?: Date) => {
  if (!date) {
    // Sort dateless drafts to the top.
    return Infinity;
  }

  return date.getTime();
};

export const getPosts = async ({
  includeUnlisted,
  includeDrafts = false,
}: {
  includeUnlisted: boolean;
  includeDrafts?: boolean;
}): Promise<CollectionEntry<"posts">[]> => {
  return (await getCollection("posts"))
    .filter((post) => {
      if (post.data.unlisted && !includeUnlisted) return false;
      return true;
    })
    .filter((post) => {
      if (post.data.draft && !includeDrafts) return false;
      return true;
    })
    .sort((a, b) => getEpoch(b.data.date) - getEpoch(a.data.date));
};
