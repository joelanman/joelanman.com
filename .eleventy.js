const highlightNunjucks = require("./lib/highlight-nunjucks.js")
const markdownIt = require("markdown-it")
const markdownItHighlightjs = require("markdown-it-highlightjs")

module.exports = (eleventyConfig) => {
	// Configure Markdown library
	const mdOptions = {
		html: true,
		typographer: true,
	}

	const highlightOptions = {
    auto: false,
    register: {
      'nunjucks': highlightNunjucks
    }
	}

	const markdownLib = markdownIt(mdOptions).use(markdownItHighlightjs, highlightOptions)

	// Replace the default 11ty markdown library
	eleventyConfig.setLibrary("md", markdownLib)

	eleventyConfig.addPassthroughCopy("assets")
  
	return {
		dir: {
			includes: "views/includes",
			layouts: "views/layouts",
		}
	}
}
