export default function ({ data }) {
  return data.blocks.map((block) => <Block key={block.id} block={block} />);
}

function Block({ block }) {
  if (block.type === "paragraph") {
    return <p dangerouslySetInnerHTML={{ __html: block.data.text }} />;
  }

  if (block.type === "image") {
    const url = `https://superadmin.elk.sh${block.data.file.url}`;
    const cdnUrl = `https://images.weserv.nl/?url=${encodeURIComponent(url)}`;

    if (block.data.file.url.endsWith(".gif")) {
      return (
        <a href={url} target="_blank">
          <img src={url} alt="" />
        </a>
      );
    }

    return (
      <a href={url} target="_blank">
        <img src={`${cdnUrl}&w=1600&output=jpg&q=80`} alt="" />
      </a>
    );
  }

  console.log("Unhandled block in SuperadminText", block);

  return null;
}
