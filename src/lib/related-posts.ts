import { cos_sim, pipeline } from "@huggingface/transformers";
import type { CollectionEntry } from "astro:content";
import { getPosts } from "./posts";

const NUMBER_OF_RELATED_POSTS = 3;
const COSINE_SIMILARITY_CUTOFF = 0.85;

let posts: CollectionEntry<"posts">[] = [];

// key: slug, value: embedding
const embeddings: Record<string, number[]> = {};

export const getRelatedPosts = async (
  slug: string
): Promise<CollectionEntry<"posts">[]> => {
  if (import.meta.env.DEV) {
    return [];
  }

  if (Object.keys(embeddings).length === 0) {
    posts = await getPosts({ includeUnlisted: false });

    const extractor = await pipeline("feature-extraction", "Xenova/gte-small");

    const output = await extractor(
      posts.map((post) => `${post.data.title} ${post.body}`),
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

    for (let i = 0; i < posts.length; i++) {
      embeddings[posts[i].slug] = calculatedEmbeddings[i];
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
