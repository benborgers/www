import fetch from "node-fetch"

export default () => new Promise(async resolve => {
  const res = await fetch("https://potion-api.now.sh/api/table?id=3e22bbb109ab40138b3899cd4b31614e")
  const json = await res.json()

  const posts = json.filter(post => post.fields.Published === true).reverse()

  resolve(posts)
})