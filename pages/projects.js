import Page from "../components/Page"
import List from "../components/List"
import Notion from "../components/Notion"

export default ({ projects }) => {
  return (
    <>
      <Page
        title="Projects"
        description="Projects made by Ben Borgers, a 17 year old programmer from Boston, MA."
      >
        <List
          items={projects.map(project => (
            <>
              <a
                className="name"
                href={project.fields.Link.startsWith("http") ? project.fields.Link : `https://${project.fields.Link}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.fields.Name}
              </a>

              <Notion raw={project.fields.Description} />
            </>
          ))}
        />
      </Page>

      <style jsx>{`
        .name {
          font-size: 20px;
          font-weight: 700;
          cursor: pointer;
          margin-bottom: 8px;
          display: block;
          max-width: max-content;
          color: var(--text-primary);
        }
      `}</style>
    </>
  )
}

import fetch from "node-fetch"

export const getStaticProps = async () => {
  const res = await fetch("https://potion-api.now.sh/api/table?id=accae8e6b5b8430cbbf62f0842fa18bc")
  const json = await res.json()

  return {
    props: {
      projects: json
    }
  }
}