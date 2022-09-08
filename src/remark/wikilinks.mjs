import matter from "gray-matter";

export default function () {
  return function (node, info) {
    if (info.history[0].includes("/pages/tufts")) {
      visit(node);
    }
  };
}

function visit(node) {
  if (node.value?.includes("[[")) {
    node.type = "html";
    node.value = node.value.replace(/\[\[(.*?)\]\]/g, (_, match) => {
      const title = matter(
        fs.readFileSync(`./src/pages/tufts${match}.mdx`, "utf-8")
      ).data.title;

      return `<a href="/tufts${match}">${title}</a>`;
    });
  }

  (node.children ?? []).forEach((node) => visit(node));
}
