module.exports = eleventyConfig => {
    eleventyConfig.addFilter('dump', value => {
        console.log(value)
        return 'dumped'
    })
}
