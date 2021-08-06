import dynamic from "next/dynamic";
const Search = dynamic(() => import('../components/Search'));
import { getAllItems } from '../lib/loading';
import markdownToHtml from '../lib/mdToHtml';
import Meta from '../components/Meta';
import Header from '../components/Header';
const Footer = dynamic(() => import('../components/Footer'));
import Layout from '../components/Layout';
const GoToTop = dynamic(() => import('../components/GoToTop'));

export default function Home({ allItems }) {


    return (
        <div >
            <Meta />
            <Header />

            <Layout>
                <Search items={allItems}></Search>
            </Layout>

            <Footer />

            <GoToTop />



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

    const allItemsWithTags = allItems.map(item => {
        item.data['tags'] = item.data.tags.filter(tag => allTitles.includes(tag))
        return item
    })


    return {
        props: { allItems: allItemsWithTags }
    }
}