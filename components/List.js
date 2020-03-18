export default ({ items, noPadding }) => {
  return (
    <>
      <ul>
          {items.map((item, i) => (
            <li key={i} className={i === 0 ? "first" : i === (items.length -1) ? "last" : ""}>{item}</li>
          ))}
      </ul>

      <style jsx>{`
        ul {
          border: 2px solid var(--border);
          border-radius: 8px;
          overflow: hidden;
        }

        li {
          list-style-type: none;
          transition: background-color .2s;
          padding: ${noPadding ? "0" : "24px"};
        }

        .first {
          padding-top: ${noPadding ? "0" : "32px"};
        }

        .last {
          padding-bottom: ${noPadding ? "0" : "32px"};
        }

        @media (hover: hover) {
          li:hover {
            background-color: var(--background-secondary);
          }

          li :global(a:hover) {
            opacity: 1;
          }
        }        
      `}</style>
    </>
  )
}