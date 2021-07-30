import unified from 'unified'
import math from 'remark-math'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
const rehypeHighlight = require('rehype-highlight')
const remarkGfm = require('remark-gfm')
const rehypeKatex = require('rehype-katex')


// const rehypeAttrs = require('rehype-attr')
// const rehypeFigure = require("rehype-figure")
// const rehypeSlug = require('rehype-slug')
// const rehypeHighlight = require('rehype-highlight')
// import rehypeKatex from 'rehype-katex'
// const rehypeParse = require('rehype-parse')
// const rehypeWrap = require('rehype-wrap')
// var rehype2remark = require('rehype-remark')

// // const rehypeToc = require("@jsdevtools/rehype-toc");
// // import rehypeDecorate from 'rehype-decorate'
// // const rehypeRewrite = require('rehype-rewrite')


// const remarkToc = require('remark-toc')
// const remarkEmoji = require('remark-emoji');
// // const remarkSlug = require('remark-slug')
// const remarkSectionize = require('remark-sectionize')
// // const remarkCollapse = require('remark-collapse')
// // import remarkMath from 'remark-math'



export default async function markdownToHtml(markdownFile: string) {
    const result = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        // .use(rehypeHighlight, {
        //     languages: {
        //         javascript: require('highlight.js/lib/languages/javascript'),
        //         typescript: require('highlight.js/lib/languages/typescript'),
        //         python: require('highlight.js/lib/languages/python'),
        //     }
        // })
        .use(rehypeStringify)
        .process(markdownFile)
    // .use(remark2rehype, { allowDangerousHtml: true })
    // .use(rehypeRaw)
    // .use(rehypeFigure)
    // .use(rehypeStringify)

    // // rehype back remark
    // .use(rehypeParse, { fragment: true })
    // .use(rehype2remark, { allowDangerousHtml: true })
    // .use(remarkSectionize)

    // .use(remarkEmoji, { emoticon: true })
    // .use(remarkToc)


    // .use(remark2rehype, { allowDangerousHtml: true })
    // .use(rehypeRaw)

    // .use(rehypeSlug)
    // // .use(rehypeWrap, { selector: 'h2 ~ p', wrapper: 'section' })
    // .use(rehypeHighlight)
    // .use(rehypeKatex)
    // .use(rehypeHighlight)

    // .use(rehypeAttrs, { properties: 'attr' })

    // .use(rehypeStringify)
    // .process(markdownFile)

    return result.toString()
}
