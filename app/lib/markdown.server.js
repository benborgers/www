import syntaxHighlight from "~/lib/syntaxHighlight";

const md = require("markdown-it")({
  typographer: true,
  highlight: (str, lang) => syntaxHighlight(str, lang),
});

export default function (string) {
  return md.render(string);
}
