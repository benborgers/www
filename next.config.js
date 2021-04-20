module.exports = {
    redirects() {
        return [
            {
                source: '/blog/:slug',
                destination: '/posts/:slug',
                permanent: true
            }
        ]
    },
    future: {
        webpack5: true
    }
}
