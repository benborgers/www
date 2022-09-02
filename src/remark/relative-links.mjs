const URL_PREFIXES = ["/tufts/psy1", "/tufts/ger170"];

export default function () {
  return (node, info) => {
    URL_PREFIXES.forEach((path) => {
      if (info.history[0].includes(path)) {
        rewriteLinks(node, path);
      }
    });
  };
}

function rewriteLinks(node, prefix) {
  if (node.type === "link") {
    node.url = prefix + "/" + node.url;
  }

  (node.children ?? []).forEach((node) => rewriteLinks(node, prefix));
}
