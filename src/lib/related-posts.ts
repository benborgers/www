import { cos_sim, pipeline } from "@huggingface/transformers";
import type { CollectionEntry } from "astro:content";
import fs from "fs";
import { getPosts } from "./posts";

const NUMBER_OF_RELATED_POSTS = 3;
const COSINE_SIMILARITY_CUTOFF = 0.85;
const CACHE_FILE_PATH = `./node_modules/.astro/related-posts.json`;

let posts: CollectionEntry<"posts">[] = [];

// key: slug, value: embedding
let embeddings: Record<string, number[]> = {};

export const getRelatedPosts = async (
  slug: string
): Promise<CollectionEntry<"posts">[]> => {
  if (posts.length === 0) {
    posts = await getPosts({ includeUnlisted: false });
  }

  if (import.meta.env.DEV) {
    return posts.slice(0, NUMBER_OF_RELATED_POSTS);
  }

  if (Object.keys(embeddings).length === 0) {
    if (fs.existsSync(CACHE_FILE_PATH)) {
      embeddings = JSON.parse(fs.readFileSync(CACHE_FILE_PATH, "utf8"));
      console.log(
        `[related-posts] Loaded ${
          Object.keys(embeddings).length
        } embeddings from cache`
      );
    }

    const extractor = await pipeline("feature-extraction", "Xenova/gte-small");

    const postsToEmbed = posts.filter((post) => !(post.slug in embeddings));
    console.log(`[related-posts] Need to embed ${postsToEmbed.length} posts`);

    if (postsToEmbed.length !== 0) {
      const output = await extractor(
        postsToEmbed.map((post) => `${post.data.title} ${post.body}`),
        { pooling: "mean", normalize: true }
      );

      const calculatedEmbeddings = Array.from(output.data).reduce<number[][]>(
        (acc, value, index) => {
          const embeddingIndex = Math.floor(index / output.dims[1]);
          if (!acc[embeddingIndex]) {
            acc[embeddingIndex] = [];
          }
          acc[embeddingIndex].push(value as number);
          return acc;
        },
        []
      );

      for (let i = 0; i < postsToEmbed.length; i++) {
        embeddings[postsToEmbed[i].slug] = calculatedEmbeddings[i];
      }

      fs.writeFileSync(CACHE_FILE_PATH, JSON.stringify(embeddings, null, 2));
      console.log(
        `[related-posts] Saved ${
          Object.keys(embeddings).length
        } embeddings to cache`
      );
    }
  }

  /*
   * Runtime logic:
   */

  if (!(slug in embeddings)) {
    // This post was not embedded, probably because it is unlisted.
    // No related posts.
    return [];
  }

  const similarities: { slug: string; similarity: number }[] = [];

  for (const embeddedSlug in embeddings) {
    if (embeddedSlug === slug) continue; // Skip yourself

    const similarity = cos_sim(embeddings[slug], embeddings[embeddedSlug]);

    similarities.push({
      slug: embeddedSlug,
      similarity,
    });
  }

  const sortedSimilarities = similarities.sort(
    (a, b) => b.similarity - a.similarity
  );

  return sortedSimilarities
    .filter((similarity) => similarity.similarity >= COSINE_SIMILARITY_CUTOFF)
    .slice(0, NUMBER_OF_RELATED_POSTS)
    .map((similarity) => posts.find((post) => post.slug === similarity.slug)!);
};
