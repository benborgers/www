import { getCollection, type CollectionEntry } from "astro:content";

const getTimestamp = (date?: Date) => {
  if (!date) {
    // Sort dateless drafts to the top.
    return Infinity;
  }

  return date.getTime();
};

const getCurrentTimeEastern = () => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
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

export const getPosts = async ({
  includeUnlisted,
  includeDrafts = false,
}: {
  includeUnlisted: boolean;
  includeDrafts?: boolean;
}): Promise<CollectionEntry<"posts">[]> => {
  return (await getCollection("posts"))
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
      if (
        post.data.date &&
        post.data.date > getCurrentTimeEastern() &&
        !includeDrafts
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => getTimestamp(b.data.date) - getTimestamp(a.data.date));
};
