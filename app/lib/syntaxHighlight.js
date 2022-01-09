import prism from "prismjs";
// import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-css";
import "prismjs/components/prism-php";
import "prismjs/components/prism-json";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-toml";

export default function (code, language) {
  if (prism.languages[language]) {
    return prism.highlight(code, prism.languages[language], language);
  } else {
    return code;
  }
}
