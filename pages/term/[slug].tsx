import { getAllItems } from "../../lib/loader"
import SearchItem from '../../components/SearchItem';
import { Item } from "../../lib/IItemData";
import Footer from '../../components/Footer';
import tocStyles from '../../components/TableOfContents.module.css'
import dynamic from 'next/dynamic';
import classNames from 'classnames';
import TermStaticNavbar from '../../components/Term/TermStaticNavbar';
import TermLayout from '../../components/Term/TermLayout';
const TermTableOfContents = dynamic(() => import('../../components/TableOfContents'));

export default function Term({ term, all }: { term: Item, all: Item[] }) {

    return (
        <>
            <TermStaticNavbar terms={all} />
            <main className="bg-indigo-50">
                <div className="container mx-auto grid grid-cols-4 pt-4">



                    <div className={classNames(tocStyles.toc, 'col-span-4 lg:col-span-1')}>
                        <div className={tocStyles.stickyNav}>
                            <TermTableOfContents />
                        </div>
                        {/* <div className={classNames('col-span-3 sticky top-2 lg:top-24 z-50 h-0 lg:h-20 p-4 hidden lg:block')}>
                            <div className="text-2xl">Content</div>
                        </div> */}
                    </div>

                    <div className="col-span-4 lg:col-span-3">
                        <div className="col-span-12 lg:col-span-9 mt-6">
                            <SearchItem key={term.hash + 'termpage'} item={term} />
                        </div>
                    </div>

                </div>
            </main>

            <Footer></Footer>
        </>
    )
}

export async function getStaticProps({ params }) {
    const all = getAllItems()
    const term = (all.filter(term => term.slug === params.slug))[0]

    return {
        props: {
            all, term
        }
    }
}

export async function getStaticPaths() {

    const allTerms = getAllItems()

    return {
        paths: allTerms.map((term) => {
            return {
                params: {
                    slug: term.slug
                }
            }
        }),
        fallback: false,
    }
}