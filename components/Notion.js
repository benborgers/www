export default ({ raw, longform=false }) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: raw }} />

      <style jsx>{`
        font-size: 20px;
        line-height: 1.6;
        margin-bottom: 20px;

        div :global(*) {
          font-size: 20px;
          line-height: 1.6;
          margin-bottom: 20px;
          ${longform ? `font-weight: 400;` : ""}
        }

        div :global(h1) {
          font-size: 28px;
          color: var(--text-primary);
          font-weight: 600;
          margin-top: 64px;
          margin-bottom: 16px;
          line-height: 1.3;
        }

        div :global(img) {
          width: 100%;
        }

        div :global(blockquote) {
          background-color: var(--background-secondary);
          padding: 16px;
          border-radius: 4px;
          font-size: 18px;
        }

        div :global(ul), div :global(ol) {
          margin: 32px 0;
          margin-left: 32px;
        }

        div :global(li) {
          margin-bottom: 8px;
        }

        div :global(code), div :global(code *) {
          font-family: "Roboto Mono", monospace;
        }

        div :global(pre), div :global(code), div :global(.token) {
          line-height: 1.3;
        }

        div :global(pre) {
          background-color: var(--background-secondary);
          padding: 24px;
          border-radius: 4px;
          overflow: scroll;
        }

        div :global(pre code), div :global(pre code *) {
          font-size: 15px;
        }

        div :global(code) {
          background-color: var(--background-tertiary);
          color: var(--text-primary);
          padding: 3px 4px;
          border-radius: 4px;
          vertical-align: 2%;
        }

        div :global(code), div :global(code *) {
          font-size: 16px;
        }

        div :global(pre code) {
          background-color: inherit;
          padding: 0;
          color: inherit;
          border-radius: 0;
        }

        div :global(a code) {
          text-decoration: underline;
          text-decoration-color: var(--text-secondary);
        }

        div :global(hr) {
          border: 1px solid var(--background-tertiary);
          margin: 64px 0;
        }
      `}</style>
    </>
  )
}