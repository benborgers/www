const colors = require("./colors.js")

module.exports = (title, color) => {
  const shades = colors[color]

  const html = `
    <main>
      <div>
        <p>${title}</p>
      </div>
    </main>
`

  const css = `
    @import url("https://rsms.me/inter/inter.css");

    * {
      margin: 0;
      padding: 0;
    }

    main {
      height: 100vh;
      display: grid;
      place-items: center center;
    }

    div {
      background-color: ${shades["100"]};
      padding: 30px 60px;
      border-radius: 999px;
    }

    p {
      font-family: Inter, sans-serif;
      font-size: 80px;
      font-weight: 600;
      color: ${shades["500"]};
    }
  `

  const clean = text => encodeURIComponent(
    text
    .replace(/\n/g, "")
    .replace(/>( +)</g, "><")
    .replace(/;( +)/g, ";")
    .replace(/:( +)/g, ":")
    .replace(/} ( +)/g, "}")
    .replace(/—/g, "-")
    .trim()
  )

  return `https://og-image.benborgers.now.sh?html=${clean(html)}&css=${clean(css)}`
}