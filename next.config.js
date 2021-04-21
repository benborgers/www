module.exports = {
    redirects() {
        const redirects = {
            '/blog/:slug': '/posts/:slug',
            '/a81d0c09-5d6f-4310-baf6-2fc2938b89d2': '/',
            '/readme/embroidery': '/1847bacf-5ef0-42db-b053-f70248f54362'
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
    },
    future: {
        webpack5: true
    }
}
