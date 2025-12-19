import { collection, config, fields } from "@keystatic/core";

export default config({
  storage: {
    kind: "github",
    repo: "benborgers/www",
  },
  ui: {
    brand: {
      name: "ben.page",
      mark: () => (
        <img
          src="https://emojicdn.elk.sh/🐙"
          style={{ height: "1em", transform: "translateY(-1px)" }}
        />
      ),
    },
  },
  collections: {
    posts: collection({
      label: "Posts",
      columns: ["title", "date", "draft"],
      slugField: "title",
      path: "src/content/posts/*",
      format: { contentField: "body" },
      entryLayout: "content",
      previewUrl: "/{slug}",
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        date: fields.date({ label: "Date" }),
        cover_image: fields.image({
          label: "Cover image",
          directory: "public/posts",
          publicPath: "/posts",
        }),
        draft: fields.checkbox({ label: "Draft" }),
        starred: fields.checkbox({ label: "Starred" }),
        unlisted: fields.checkbox({ label: "Unlisted" }),
        body: fields.markdoc({
          label: "Body",
          extension: "md",
          options: {
            image: {
              directory: "public/posts",
              publicPath: "/posts",
            },
          },
        }),
      },
    }),
  },
});
