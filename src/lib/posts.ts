import { getCollection, type CollectionEntry } from "astro:content";
import { customPosts, type CustomPostInfo } from "./custom-posts";

export type CustomPost = {
  collection: "custom";
  id: string;
  body: string;
  data: CollectionEntry<"posts">["data"];
};

export type Post = CollectionEntry<"posts"> | CustomPost;

const toPost = ({ id, ...data }: CustomPostInfo): CustomPost => ({
  collection: "custom",
  id,
  body: "",
  data: { starred: false, unlisted: false, draft: false, ...data },
});

export const getCustomPost = (id: string): CustomPost => {
  const info = customPosts.find((post) => post.id === id);
  if (!info) throw new Error(`No custom post "${id}" in src/lib/custom-posts.ts`);
  return toPost(info);
};

const getTimestamp = (date?: Date) => {
  if (!date) {
    // Sort dateless drafts to the top.
    return Infinity;
  }

  return date.getTime();
};

const getCurrentTimePacific = () => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(new Date());
  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value])
  );

  return new Date(
    Date.UTC(
      parseInt(values.year),
      parseInt(values.month) - 1,
      parseInt(values.day),
      parseInt(values.hour),
      parseInt(values.minute),
      parseInt(values.second)
    )
  );
};

export const isFutureDate = (date?: Date) =>
  Boolean(date && date > getCurrentTimePacific());

export const getPosts = async ({
  includeUnlisted,
  includeDrafts = false,
}: {
  includeUnlisted: boolean;
  includeDrafts?: boolean;
}): Promise<Post[]> => {
  return [...(await getCollection("posts")), ...customPosts.map(toPost)]
    .filter((post) => {
      if (post.data.unlisted && !includeUnlisted) {
        return false;
      }
      return true;
    })
    .filter((post) => {
      if (post.data.draft && !includeDrafts) {
        return false;
      }
      return true;
    })
    .filter((post) => {
      if (isFutureDate(post.data.date) && !includeDrafts) {
        return false;
      }
      return true;
    })
    .sort((a, b) => getTimestamp(b.data.date) - getTimestamp(a.data.date));
};
