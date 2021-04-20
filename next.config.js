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
            require('./scripts/load-notion-data')
        }

        return config
    },
    future: {
        webpack5: true
    }
}
