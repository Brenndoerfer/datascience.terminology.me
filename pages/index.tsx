// import dynamic from "next/dynamic";
import { getAllItems } from '../lib/loader';
import Meta from '../components/Meta';
import Header from '../components/Header';
import HomeLayout from '../components/HomeLayout';
import { Item } from "../lib/IItemData";
import Footer from '../components/Footer';
import GoToTop from '../components/GoToTop';
import Search from '../components/Search';


export default function Home({ allItems }: { allItems: Item[] }) {

    // console.log(allItems)


    return (
        <div >
            <Meta />
            <Header />

            <HomeLayout>
                <Search items={allItems}></Search>
            </HomeLayout>

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
        allTitles.push(item.data.title.toLowerCase().replace(/[^a-zA-Z0-9]/g, ''))

    }))

    // allTags = allTags.flat().map(tag => tag.toLowerCase());

    const allItemsWithTags = allItems.map(item => {
        item.data.tags = item.data.tags.filter(tag => allTitles.includes(tag.toLowerCase().replace(/[^a-zA-Z0-9]/g, '')))
        return item
    })

    // console.log(allItemsWithTags)


    return {
        props: { allItems: allItemsWithTags }
    }
}