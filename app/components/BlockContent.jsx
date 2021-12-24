import BlockContent from "@sanity/block-content-to-react";
import katex from "katex";
import syntaxHighlight from "~/lib/syntaxHighlight";

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
      code(props) {
        return (
          <pre>
            <code
              className={`language-${props.node.language}`}
              dangerouslySetInnerHTML={{
                __html: syntaxHighlight(props.node.code, props.node.language),
              }}
            />
          </pre>
        );
      },
    },
  };

  return (
    <BlockContent
      blocks={blocks}
      serializers={serializers}
      className="prose max-w-none prose-sky"
      projectId="wg50cnqt"
      dataset="production"
    />
  );
}
