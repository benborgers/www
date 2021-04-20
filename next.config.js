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
    webpack: (config, { isServer }) => {
        if(isServer) {
            require('./scripts/generate-sitemap')
        }

        return config
    },
    future: {
        webpack5: true
    }
}
