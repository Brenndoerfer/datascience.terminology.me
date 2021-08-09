import React from "react";
import Link from 'next/link';
import { AiFillExperiment, AiOutlineArrowLeft } from "react-icons/ai";
import { Item } from "../../lib/IItemData";
import NavbarSearch from "../NavbarSearch";

export default function TermStaticNavbar({ terms }: { terms: Item[] }) {
    return (
        <>
            <header className="sticky top-0 z-50 bg-white -mt-4 text-gray-600 body-font border-b border-indigo-300">

                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center ">

                    <Link href="/">
                        <a className="title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                            <span className="ml-3 text-xl"><span><AiFillExperiment className="inline mr-1 align-text-bottom text-2xl" /></span> Data Science Terminology</span>
                        </a>
                    </Link>

                    <Link href="/" passHref>
                        <button className="inline-flex ml-auto p-1 px-4 w-full md:w-auto md:px-8 "><span><AiOutlineArrowLeft className="inline align-middle mr-2" /></span>Home</button>
                    </Link>

                    <div className=" md:ml-auto md:mr-auto w-full lg:w-1/2 mt-2 lg:mt-0">
                        <NavbarSearch terms={terms} />
                    </div>

                    {/* <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                        <a className="mr-5 hover:text-gray-900">First Link</a>
                        <a className="mr-5 hover:text-gray-900">Second Link</a>
                        <a className="mr-5 hover:text-gray-900">Third Link</a>
                        <a className="mr-5 hover:text-gray-900">Fourth Link</a>
                    </nav>
                    <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">Button
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button> */}
                </div>
            </header>
        </>
    )
}