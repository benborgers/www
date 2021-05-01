// Loaders allow us to load data before building the site and then use it in MDX.
// This file just runs all the loaders in the loaders/ folder.
// Each loader should place a json file in the data/ repository.
const fs = require('fs');

(async () => {
    for(const filename of fs.readdirSync('./loaders')) {
        if(filename !== 'index.js') {
            const fn = require(`./${filename}`)
            const [id, value] = await fn()

            if(! fs.existsSync('./data')) {
                fs.mkdirSync('./data')
            }

            fs.writeFileSync(`./data/${id}.json`, JSON.stringify(value, null, 2))
            console.log(`wrote loader ${id}`)
        }
    }
})()
