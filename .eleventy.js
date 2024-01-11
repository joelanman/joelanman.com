module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets")
    return {
        dir: {
            includes: "views/includes",
            layouts: "views/layouts"
        }
    }
}
