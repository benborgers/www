import prism from "prismjs";
require("prismjs/components/prism-markup-templating");
require("prismjs/components/prism-css");
require("prismjs/components/prism-php");
require("prismjs/components/prism-json");
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-jsx");
require("prismjs/components/prism-bash");
require("prismjs/components/prism-yaml");
require("prismjs/components/prism-toml");

const md = require("markdown-it")({
  typographer: true,
  highlight: (str, lang) => {
    if (prism.languages[lang]) {
      return prism.highlight(str, prism.languages[lang], lang);
    } else {
      return str;
    }
  },
});

export default function (string) {
  return md.render(string);
}
