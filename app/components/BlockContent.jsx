import BlockContent from "@sanity/block-content-to-react";
import katex from "katex";

export default function ({ blocks }) {
  let serializers = {
    types: {
      block(props) {
        if (/^h\d/.test(props.node.style)) {
          let level = parseInt(props.node.style.slice(1)) + 1;
          let El = `h${level}`;
          return <El>{props.children}</El>;
        }
        return BlockContent.defaultSerializers.types.block(props);
      },
      latex(props) {
        let displayMode = blocks.find(
          (block) => block._key === props.node._key
        );

        let html = katex.renderToString(props.node.body, {
          throwOnError: false,
          displayMode,
        });

        const El = displayMode ? "div" : "span";

        return <El dangerouslySetInnerHTML={{ __html: html }} />;
      },
    },
  };

  return (
    <BlockContent
      blocks={blocks}
      serializers={serializers}
      className="prose max-w-none"
    />
  );
}