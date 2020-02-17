const fetch = require("node-fetch")

const base = "https://potion-api.now.sh/api"

exports.table = pageId => new Promise(resolve => {
  fetch(`${base}/table?id=${pageId}`)
    .then(res => res.json())
    .then(json => resolve(json))
})

exports.html = pageId => new Promise(resolve => {
  fetch(`${base}/html?id=${pageId}`)
    .then(res => res.text())
    .then(text => resolve(text))
})