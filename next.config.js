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
            '/17abc988-cd00-47ea-8883-6932ba69844c': '/cabinet-photos',
            '/e2946b1f-2c3b-4967-8abe-68101356eca6': '/psychology-and-law',
            '/92258a23-27df-4946-9d43-03041a8fd803': '/netlify-cancel-build-programmatically',
            '/901f8d0e-ba28-4bfc-af74-e36d7c111d23': '/tailwind-typography-customize',
            '/28f8b29b-97a2-48b2-9988-03a9b8d4335f': '/tailwind-font',
            '/b10e36b0-9568-4c4a-9660-88cf9fb3fe97': '/node-sha1',
            '/1b635a80-be09-46d1-ba85-a6d1921068eb': '/node-fetch-download-image',
            '/e0f14f4b-5a8d-4100-8f45-4653622a9f38': '/fathom-netlify',
            '/ad1b276c-edae-46da-afaa-6c8f653851ca': '/react-static-tailwind',
            '/9713fcf4-abba-4cc2-98f5-b7adcd2ce0b3': '/react-static-scroll',
            '/e021ff80-253b-4dc2-931e-9d67a582bccb': '/react-static-head',
            '/dba3cd3d-7517-476c-a564-994112f355e3': '/react-static-sitemap',
            '/29ed200d-5148-48bd-b2ba-23e4230e79c1': '/error-spread-array-tslib',
            '/e61f1f37-e664-45a3-92d1-d892e49fd5c0': '/ses-smtp',
            '/332a561c-992f-4e46-b291-4ad4bdf42eb8': '/next-auth-ses',
            '/b7874b71-45c1-432f-8a20-ca5db1769224': '/psql',
            '/c97b1c5c-e3b4-484a-b83e-72e53b6b34b0': '/degrees-of-murder',
            '/9db902ad-55f7-4a02-9ec7-8585afa08d6c': '/fernald-e-ham',
            '/3966fe86-886a-429f-b901-b3692d65af80': '/black-mirror-s01e01',
            '/46ac3507-44c4-4be0-b8d5-dde336ee8fdb': '/black-mirror-s01e02',
            '/16e094f9-d5d2-46a8-9a44-e7401fbd5fee': '/black-mirror-s01e03',
            '/9cb42c5a-d30b-4293-a2fa-9cd73c1ef935': '/show-your-work',
            '/e5017dd5-66a3-4461-9cba-d39f85aba258': '/new-hampshire-2021',
            '/1847bacf-5ef0-42db-b053-f70248f54362': '/embroider-svg'
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
