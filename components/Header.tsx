import { AiFillExperiment } from 'react-icons/ai';
import { ImDatabase } from 'react-icons/im';
import { RiMoneyDollarBoxFill } from 'react-icons/ri';

export default function Header() {
    return (
        <>
            <header className="z-0 border-b border-indigo-200" id="top">
                <div className="w-100 bg-white mb-8  p-4">
                    <div className="max-w-6xl mx-auto pt-8 pb-16 text-md text-gray-500">
                        <div className="text-center">
                            <h1>Data Science & Machine Learning Terminology</h1>
                            <p className="mt-4 mx-auto max-w-3xl">
                                Compact and clear explainations of data science and machine learning related terms
                            </p>
                            <div className="mt-8 text-sm">
                                <a href="#">
                                    <span className="inline-block my-2 mx-2 bg-indigo-100 p-2 rounded text-indigo-900 shadow-sm border border-indigo-300">
                                        <span><AiFillExperiment className="inline mr-1" /></span>Data Science</span></a>
                                <span className="opacity-50">
                                    <span className="inline-block cursor-not-allowed my-2 mx-2 bg-red-100 p-2 rounded text-red-900 shadow-sm border border-red-300">
                                        <span><ImDatabase className="inline mr-1" /></span>Data Engineering </span>
                                    <span className="inline-block  cursor-not-allowed my-2 mx-2 bg-green-100 p-2 rounded text-green-900 shadow-sm border border-green-300">
                                        <span><RiMoneyDollarBoxFill className="inline mr-1" /></span>Finance</span>
                                    {/* <span className="mx-2 bg-blue-100 p-2 rounded text-blue-900 shadow-sm border border-blue-300">Cloud </span> */}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}