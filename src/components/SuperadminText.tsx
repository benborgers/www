export default function ({ data }) {
  return data.blocks.map((block) => <Block key={block.id} block={block} />);
}

function Block({ block }) {
  if (block.type === "paragraph") {
    return <p dangerouslySetInnerHTML={{ __html: block.data.text }} />;
  }

  if (block.type === "image") {
    const url = `https://superadmin.elk.sh${block.data.file.url}`;

    let src = block.data.file.url.endsWith(".gif")
      ? url
      : `https://images.weserv.nl/?url=${encodeURIComponent(
          url
        )}&w=1600&output=jpg&q=80`;

    return (
      <a href={url} target="_blank" className="cursor-zoom-in">
        <img src={src} alt="" />
      </a>
    );
  }

  console.log("Unhandled block in SuperadminText", block);

  return null;
}
