// Compiles markdown posts to json, so they can be imported.

const fs = require("fs");
const grayMatter = require("gray-matter");

const filenames = fs.readdirSync("app/posts");

const json = [];

filenames.forEach((filename) => {
  const { content, data } = grayMatter(
    fs.readFileSync(`app/posts/${filename}`, "utf-8")
  );

  console.log(`posts-to-json: ${filename}`);

  json.push({
    ...data,
    html: content,
  });
});

fs.mkdirSync("app/generated", { recursive: true });
fs.writeFileSync(`app/generated/posts.json`, JSON.stringify(json));
