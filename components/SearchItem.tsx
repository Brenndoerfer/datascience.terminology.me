import styles from './Searchitem.module.css'
import React, { useState } from "react"
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
const gfm = require('remark-gfm')
const rehypeKatex = require('rehype-katex')
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css'
const footnotes = require('remark-footnotes')
var unwrapImages = require('remark-unwrap-images')

import { BsBoxArrowDown } from 'react-icons/bs'
import { GrGrow } from 'react-icons/Gr'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Collapsible from 'react-collapsible';
// import { Components } from 'react-markdown'
// import remarkNextImage from '../../../npm/remark-next-image'

// import js from 'react-syntax-highlighter/dist/cjs//languages/prism/javascript';
// import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';

// SyntaxHighlighter.registerLanguage('javascript', js);
// SyntaxHighlighter.registerLanguage('python', python);


interface SearchItemProps {
    item: Item
}

export interface Item {
    title: string,
    content: string,
    excerpt: string,
    key: string,
}

const components = {
    code({ node, inline, className, children, ...props }) {


        if (node.children[0].type !== "image") {
            const match = /language-(\w+)/.exec(className || '')
            if (!inline && match) {
                return (
                    <SyntaxHighlighter style={vs} customStyle={{ fontSize: '1em' }} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
                )
            } else {
                return (
                    <code className={className} {...props} >{String(children)}</code>
                )
            }
        }
        // if (node.children[0].tagName === "img") {
        //     // console.log(node);
        //     const image = node.children[0];
        //     return <Image src={image.url} alt={image.alt} height="200" width="355" />;
        // }
    },
    img: image => {
        return (
            <div className="w-100 md:w-1/2 mx-auto my-4 md:my-6">
                <Image src={image.src} alt={image.alt} layout="responsive" width="400" height="200" loading="lazy" placeholder="blur" blurDataURL={image.src} decoding="async" quality="75" />
            </div>
        )
    },

}

// const components = {
//     img: image => {
//         return <image src="{image.src}" alt="{image.alt}" height="200" width="355" />
//     },
// }

export default function SearchItem(props: SearchItemProps) {

    const [item, setItem] = useState(props.item)


    return (
        <article>
            <div className={styles.searchitem}>
                <div className={styles.itemContainer}>
                    <div className="">
                        <div className="">
                            <div className="p-8">
                                <section className="">
                                    <h2
                                        id={item.data.title.toLowerCase().replace(/ /g, '-')}
                                        className={styles.h2Anchor}>
                                        {item.data.title}{item.data.abrv ? ` (${item.data.abrv})` : ''}
                                    </h2>
                                    {
                                        item.excerpt.replace(/\n/g, '').trim().length > 0 ? (
                                            <div>
                                                <ReactMarkdown
                                                    components={components}
                                                    remarkPlugins={[unwrapImages, [gfm, { singleTilde: false }], remarkMath, [footnotes, { inlineNotes: true }]]}
                                                    rehypePlugins={[rehypeKatex]} // rehypeTitleFigure
                                                    children={item.excerpt}
                                                />
                                            </div>
                                        ) : (item.content.replace(/\n/g, '').trim().length == 0 ? <div className="text-gray-500">Content in progress</div> : '')
                                    }
                                </section>
                                <section>
                                    {
                                        item.content.replace(/\n/g, '').trim().length > 0 ? (
                                            <>
                                                <div>
                                                    <ReactMarkdown
                                                        components={components}
                                                        remarkPlugins={[unwrapImages, [gfm, { singleTilde: false }], remarkMath, [footnotes, { inlineNotes: true }]]}
                                                        rehypePlugins={[rehypeKatex]} // rehypeTitleFigure
                                                        children={item.content}
                                                    />
                                                </div>
                                            </>
                                        ) : ('')
                                    }
                                </section>
                            </div>
                            <hr className="" />
                            <div className="px-8 py-2">
                                <section>
                                    <div className="flex flex-col-2">
                                        <div className={styles.related}>Related</div>
                                        <div className="flex-auto ml-2 md:ml-4">
                                            {item.data.tags.length > 0 ?
                                                item.data.tags.map(tag => {
                                                    return <Link
                                                        href={`#${tag.toLowerCase().replace(/ /g, '-')}`}
                                                        key={item.hash + tag + 'link'}
                                                    >
                                                        <a key={item.hash + tag} className={styles.relatedTerm} onClick={() => props.resetHandler()}>{tag}</a>
                                                    </Link>
                                                })
                                                : <span className="text-sm text-gray-600">None</span>}
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </article >
    )
}