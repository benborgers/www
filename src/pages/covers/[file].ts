import type { APIRoute, GetStaticPaths, ImageMetadata } from "astro";
import fs from "node:fs/promises";
import { getPosts } from "../../lib/posts";

// Cover images at a URL that never changes, /covers/<slug>.<format>, for RSS
// and the emails Buttondown sends from it. Emails load the image long after
// they're sent, so a hashed /_astro URL breaks once the cover is replaced.
export const getStaticPaths = (async () => {
  const posts = await getPosts({ includeUnlisted: true });
  return posts.flatMap(({ id, data: { cover_image } }) =>
    cover_image
      ? [{ params: { file: `${id}.${cover_image.format}` }, props: { image: cover_image } }]
      : []
  );
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ image: ImageMetadata }> = async ({ props }) => {
  // Astro hides the source path of imported images on `fsPath`.
  const { fsPath } = props.image as ImageMetadata & { fsPath: string };
  return new Response(await fs.readFile(fsPath));
};
