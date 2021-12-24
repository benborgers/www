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

export default function (code, language) {
  if (prism.languages[language]) {
    return prism.highlight(code, prism.languages[language], language);
  } else {
    return code;
  }
}
