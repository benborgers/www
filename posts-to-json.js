// Compiles markdown posts to json, so they can be imported.

const fs = require("fs");
const grayMatter = require("gray-matter");

const prism = require("prismjs");
require("prismjs/components/prism-markup-templating");
require("prismjs/components/prism-css");
require("prismjs/components/prism-php");
require("prismjs/components/prism-json");
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-jsx");
require("prismjs/components/prism-bash");
require("prismjs/components/prism-yaml");
require("prismjs/components/prism-toml");
require("prismjs/components/prism-java");

const md = require("markdown-it")({
  typographer: true,
  highlight: (code, language) => {
    if (prism.languages[language]) {
      return prism.highlight(code, prism.languages[language], language);
    } else {
      console.log(`Prism can’t syntax highlight ${language}`);
      return code;
    }
  },
});

const filenames = fs.readdirSync("app/posts");

const json = [];

filenames.forEach((filename) => {
  const { content, data } = grayMatter(
    fs.readFileSync(`app/posts/${filename}`, "utf-8")
  );

  console.log(`posts-to-json: ${filename}`);

  json.push({
    ...data,
    slug: filename.replace(".md", ""),
    html: md.render(content),
  });
});

json.sort((a, b) => b.date - a.date);

fs.mkdirSync("app/generated", { recursive: true });
fs.writeFileSync(`app/generated/posts.json`, JSON.stringify(json, null, 2));
