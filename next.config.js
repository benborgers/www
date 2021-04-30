module.exports = {
    redirects() {
        const redirects = {
            '/blog/:slug': '/posts/:slug',
            '/a81d0c09-5d6f-4310-baf6-2fc2938b89d2': '/',
            '/readme/embroidery': '/1847bacf-5ef0-42db-b053-f70248f54362',
            '/grade-12/dystopias/brave-new-world/reading-notes': '/17fe1e9e-87cf-47b4-b159-1495f8fb2cc9',
            '/posts/50': '/posts/notion-to-website'
        }

        const output = []

        for(const source in redirects) {
            output.push({
                source,
                destination: redirects[source],
                permanent: true
            })
        }

        return output
    }
}
