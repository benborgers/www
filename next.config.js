module.exports = {
    redirects() {
        const redirects = {
            '/blog/:slug': '/:slug',
            '/posts/:slug': '/:slug',
            '/a81d0c09-5d6f-4310-baf6-2fc2938b89d2': '/',
            '/readme/embroidery': '/1847bacf-5ef0-42db-b053-f70248f54362',
            '/grade-12/dystopias/brave-new-world/reading-notes': '/17fe1e9e-87cf-47b4-b159-1495f8fb2cc9',
            '/posts/50': '/posts/notion-to-website',
            '/e04c1727-fa0b-4609-b781-9402ad7316eb': '/1989-reading-notes',
            '/51df37d7-61f4-4d2f-9258-83f0ec534ebc': '/ap-gov-court-cases',
            '/4b1b24cd-1cea-49ff-b4bf-4d3c9db1d390': '/bill-of-rights',
            '/17fe1e9e-87cf-47b4-b159-1495f8fb2cc9': '/brave-new-world-reading-notes',
            '/44ed19b3-73a2-4782-ad1b-594d1a91bed6': '/bu-college-essays',
            '/13814711-471e-49ee-961c-78a286f2a61d': '/common-app-essay',
            '/44bb51dc-d9ff-4666-838a-f94bf8ab439d': '/constitutional-convention',
            '/ac0a140b-391a-40b7-aa4e-1a910c6e91c3': '/parable-reading-notes',
            '/0335269c-6b01-475c-bd1a-ed287570a6de': '/tufts-college-essays',
            '/1366e7c1-6809-485d-bc13-6641401859d9': '/squeeze-theorem',
            '/e0de3980-36bb-4fec-ba0a-f610a8c4bee8': '/sinx-x',
            '/af95d135-01c0-46d0-8ecd-9f58fde46b42': '/fundamental-theorem-of-calculus',
            '/17abc988-cd00-47ea-8883-6932ba69844c': '/cabinet-photos'
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
