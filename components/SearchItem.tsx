import styles from './Searchitem.module.css'
import React, { useState } from "react"
import Image from 'next/image'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
const rehypeKatex = require('rehype-katex')
import remarkMath from 'remark-math'
import 'katex/dist/katex.min.css'
var unwrapImages = require('remark-unwrap-images')

import { Item } from '../lib/IItemData'
import { ArticleReactMarkdownComponents } from '../lib/reactMarkdownComponents';

export default function SearchItem({ item: propItem }: { item: Item }) {

    const [item, setItem] = useState(propItem)

    return (
        <article>
            <div className={styles.searchitem}>
                <div className={styles.itemContainer}>
                    <div className="p-8">
                        <section className="">
                            <Link href={'/term/' + item.slug} passHref><h2
                                id={item.data.title.toLowerCase().replace(/ /g, '-')}
                                className={styles.h2Anchor}>
                                {item.data.title}{item.data.abrv ? ` (${item.data.abrv})` : ''}
                            </h2></Link>
                            {
                                item.excerpt.replace(/\n/g, '').trim().length > 0 ? (
                                    <div>
                                        <ReactMarkdown
                                            components={ArticleReactMarkdownComponents}
                                            remarkPlugins={[unwrapImages, [gfm, { singleTilde: false }], remarkMath]}
                                            rehypePlugins={[rehypeKatex]}
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
                                                components={ArticleReactMarkdownComponents}
                                                remarkPlugins={[unwrapImages, [gfm, { singleTilde: false }], remarkMath]}
                                                rehypePlugins={[rehypeKatex]}
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

        </article >
    )
}