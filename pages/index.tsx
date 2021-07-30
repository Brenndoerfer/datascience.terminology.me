import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout';
import Search from '../components/Search';
import { getAllItems, getAllPosts } from '../lib/loading';
import markdownToHtml from '../lib/mdToHtml';
import { Item } from '../components/SearchItem';
import { AiOutlineArrowUp, AiFillExperiment, AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import { ImDatabase } from 'react-icons/im';
import { RiMoneyDollarBoxFill } from 'react-icons/ri';
import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

export default function Home({ allItems }) {

    const topRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
        console.log(position);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div >
            <Head>
                <title>Data Science & Machine Learning | Terminology.me</title>
                <meta name="description" content="Machine Learning and Data Science Terminology Explained" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.12.0/dist/katex.min.css" integrity="sha384-AfEj0r4/OFrOo5t7NnNe46zW/tFgW6x/bCJG8FqQCEo3+Aro6EYUG4+cU+KJWu/X" crossorigin="anonymous" />

            </Head>

            <Layout>
                <header className="z-0 border-b border-indigo-200" id="top" ref={topRef}>
                    <div className="w-100 bg-white mb-8  p-4">
                        <div className="max-w-6xl mx-auto pt-8 pb-16 text-md text-gray-500">
                            <div className="text-center">
                                <h1>Data Science & Machine Learning Terminlogy</h1>
                                <p className="mt-4 mx-auto max-w-3xl">
                                    Forgot what that one data science term meant?
                                    Find a compact and easy to understand explaination of all data science abd machine learning related terms <i>here</i>.
                                </p>
                                <div className="mt-8 text-sm">
                                    <a href="#"><span className="inline-block my-2 mx-2 bg-indigo-100 p-2 rounded text-indigo-900 shadow-sm border border-indigo-300"><span><AiFillExperiment className="inline  mr-1" /></span>Data Science</span></a>
                                    <span className="opacity-50">
                                        <span className="inline-block cursor-not-allowed my-2 mx-2 bg-red-100 p-2 rounded text-red-900 shadow-sm border border-red-300"><span><ImDatabase className="inline  mr-1" /></span>Data Engineering </span>
                                        <span className="inline-block  cursor-not-allowed my-2 mx-2 bg-green-100 p-2 rounded text-green-900 shadow-sm border border-green-300"><span><RiMoneyDollarBoxFill className="inline  mr-1" /></span>Finance</span>
                                        {/* <span className="mx-2 bg-blue-100 p-2 rounded text-blue-900 shadow-sm border border-blue-300">Cloud </span> */}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="bg-indigo-50 pb-16">
                    <div className="max-w-6xl mx-auto p-4">
                        <Search items={allItems}></Search>
                    </div>
                </div>

                <footer className="">
                    <div className="w-100 bg-white border-t min-h-full border-indigo-200 p-4">
                        <div className="max-w-6xl mx-auto py-16 text-md text-gray-500 text-center">
                            <div className="mb-4">How to contribute: <b>Coming soon</b></div>
                            <div>Data Science and Machine Learning Terminology</div>
                            <div>https://datascience.terminology.me</div>
                            <div className="mt-4 text-sm">Created by <a href="https://michaelbrenndoerfer.com" target="_blank">Michael Brenndoefer</a>
                                <a href="https://www.linkedin.com/in/michaelbrenndoerfer/" target="_blank"><span><AiFillLinkedin className="inline mx-1"></AiFillLinkedin></span></a>
                                <a href="https://github.com/Brenndoerfer" target="_blank"><span><AiFillGithub className="inline mx-1"></AiFillGithub></span></a>
                            </div>
                        </div>
                    </div>
                </footer>
                <Link href='/#top' scroll={true}>
                    <a className={classNames(styles.scrollTopBtn, { [styles.showScrollTopBtn]: scrollPosition > 200 })} id="myBtn" title="Go to top">
                        <AiOutlineArrowUp className="inline mb-1" />
                    </a>
                </Link>
            </Layout>



        </div >
    )
}

export async function getStaticProps() {
    const allItems = getAllItems();

    var allTags: (string[] | [string[]]) = []
    var allTitles: (string[] | [string[]]) = []

    await Promise.all(allItems.map(async (item) => {
        const excerptHtml = await markdownToHtml(item.excerpt)
        const contentHtml = await markdownToHtml(item.content.replace('<!-- sep -->', ''))

        // item.contentHtml = contentHtml
        // item.excerptHtml = excerptHtml

        allTags.push(item.data.tags)
        allTitles.push(item.data.title.toLowerCase())

    }))

    allTags = allTags.flat().map(tag => tag.toLowerCase());

    // allItems['allTags'] = allTags.flat();

    // console.log(allTags, allTitles);

    const allItemsWithTags = allItems.map(item => {
        item.data['tags'] = item.data.tags.filter(tag => allTitles.includes(tag))
        return item
    })

    console.log(allItems);
    // console.log(allItemsWithTags);



    return {
        props: { allItems: allItemsWithTags }
    }
}