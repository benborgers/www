import Head from "next/head"

import Page from "../../components/Page"
import Notion from "../../components/Notion"

export default ({ post, html }) => {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;700&display=swap" />
        <link rel="stylesheet" href="https://unpkg.com/prism-themes@1.3.0/themes/prism-duotone-sea.css" />
      </Head>

      <Page
        title={post.fields.Title}
        heading={post.fields.Title}
        description={post.fields.Description}
      >
        <Notion raw={html.replace(/\t/g, "&nbsp;&nbsp;")} longform />
      </Page>
    </>
  )
}

import fetch from "node-fetch"
import getPosts from "../../helpers/getPosts"

export const getStaticProps = async context => {
  const posts = await getPosts()
  const post = posts.find(p => p.fields.Slug === context.params.slug)
  const html = await (await fetch(`https://potion-api.now.sh/api/html?id=${post.id}`)).text()

  return {
    props: {
      post,
      html
    }
  }
}

export const getStaticPaths = async () => {
  const posts = await getPosts()

  const paths = posts.map(p => {
    return {
      params: {
        slug: p.fields.Slug
      }
    }
  })

  return {
    paths,
    fallback: false
  }
}