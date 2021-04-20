module.exports = {
    redirects() {
        return [
            {
                source: '/blog/:slug',
                destination: '/posts/:slug',
                permanent: true
            },
            {
                source: '/a81d0c09-5d6f-4310-baf6-2fc2938b89d2',
                destination: '/',
                permanent: true
            }
        ]
    },
    future: {
        webpack5: true
    }
}
