import dynamic from "next/dynamic";
import { getAllItems } from '../lib/loading';
import Meta from '../components/Meta';
import Header from '../components/Header';
import Layout from '../components/Layout';
const Footer = dynamic(() => import('../components/Footer'));
const GoToTop = dynamic(() => import('../components/GoToTop'));
const Search = dynamic(() => import('../components/Search'));


export interface ItemData {
    title: string,
    tags: string[],
    abrv: string
}
export interface Item {
    data: ItemData,
    excerpt: string,
    content: string,
    hash: string
}

export default function Home({ allItems }: { allItems: Item[] }) {

    console.log(allItems)

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
    const allItems: Item[] = getAllItems();

    // var allTags: string[][] = []
    var allTitles: string[] = []

    await Promise.all(allItems.map(async (item) => {

        // allTags.push(item.data.tags)
        allTitles.push(item.data.title.toLowerCase())

    }))

    // allTags = allTags.flat().map(tag => tag.toLowerCase());

    const allItemsWithTags = allItems.map(item => {
        item.data.tags = item.data.tags.filter(tag => allTitles.includes(tag))
        return item
    })

    // console.log(allItemsWithTags)


    return {
        props: { allItems: allItemsWithTags }
    }
}