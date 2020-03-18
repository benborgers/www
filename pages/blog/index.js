import Page from "../../components/Page"
import List from "../../components/List"

export default ({ posts }) => {
  return (
    <>
      <Page
        title="Blog"
        description="Ben Borgers' blog, with articeles on JavaScript, React, React Native, CSS, and more."
      >
        <List
          items={posts.map(post => (
            <a href={`/blog/${post.fields.Slug}`} className="no-underline">
              <p className="title">{post.fields.Title}</p>
            </a>
          ))}
          noPadding
        />
      </Page>

      <style jsx>{`
        .title {
          font-size: 20px;
          color: var(--text-primary);
        }

        a {
          display: block;
          padding: 24px;
        }

        :global(.first) a {
          padding-top: 32px;
        }

        :global(.last) a {
          padding-bottom: 32px;
        }
      `}</style>
    </>
  )
}

import getPosts from "../../helpers/getPosts"

export const getStaticProps = async () => {
  const posts = await getPosts()

  return {
    props: {
      posts
    }
  }
}