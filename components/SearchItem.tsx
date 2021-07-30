import React, { useState } from "react"
import styles from './searchitem.module.css'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
const gfm = require('remark-gfm')
const rehypeKatex = require('rehype-katex')
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css'

import { BsBoxArrowDown } from 'react-icons/bs'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vs } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Collapsible from 'react-collapsible';


// import js from 'react-syntax-highlighter/dist/cjs//languages/prism/javascript';
// import python from 'react-syntax-highlighter/dist/cjs/languages/prism/python';

// SyntaxHighlighter.registerLanguage('javascript', js);
// SyntaxHighlighter.registerLanguage('python', python);


interface SearchItemProps {
    item: Item
}

export interface Item {
    title: string,
    short: string,
    content: string,
    excerpt: string,
    key: string,
}

const components = {
    code({ node, inline, className, children, ...props }) {
        const match = /language-(\w+)/.exec(className || '')
        console.log(props)
        return !inline && match ? (
            <SyntaxHighlighter style={vs} customStyle={{ fontSize: '1em' }} language={match[1]} PreTag="div" children={String(children).replace(/\n$/, '')} {...props} />
        ) : (
            <code className={className} {...props} >{String(children)}</code>
        )
    }
}


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
                                        id={item.data.title.toLowerCase().replaceAll(' ', '-')}
                                        className={styles.h2Anchor}>
                                        {item.data.title}{item.data.abrv ? ` (${item.data.abrv})` : ''}
                                    </h2>
                                    <div>
                                        <ReactMarkdown
                                            components={components}
                                            remarkPlugins={[[gfm, { singleTilde: false }], remarkMath]}
                                            rehypePlugins={[rehypeKatex]}
                                            children={item.excerpt}
                                        />
                                    </div>
                                    {/* <div dangerouslySetInnerHTML={{ __html: item.excerptHtml }}></div> */}
                                </section>
                                <section>
                                    {
                                        item.content.replaceAll('\n', '').trim().length > 0 ? (
                                            <>
                                                <h3>Content</h3>
                                                <div>
                                                    <ReactMarkdown
                                                        components={components}
                                                        remarkPlugins={[gfm, remarkMath]}
                                                        rehypePlugins={[rehypeKatex]}
                                                        children={item.content}
                                                    />
                                                </div>
                                            </>
                                        ) : ('')
                                    }
                                    {/* <div dangerouslySetInnerHTML={{ __html: item.contentHtml }}></div> */}
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
                                                        href={`#${tag.toLowerCase().replaceAll(' ', '-')}`}
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