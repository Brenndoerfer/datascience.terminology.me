import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';
import Link from 'next/link';

export default function Footer() {
    return (
        <>
            <footer className="">
                <div className="w-100 bg-white border-t min-h-full border-indigo-200 p-4">
                    <div className="max-w-6xl mx-auto py-16 text-md text-gray-500 text-center">
                        <div className="mb-12 w-full md:w-1/2 mx-auto text-justify"><b>Note</b> Explanations are on purpose kept compact and simple. Concepts and terminology are simplified to make them more accesible to different backgrounds. If you wish tou propose changes, please raise a PR on Github.</div>
                        <div className="mb-4">How to contribute: <i>Coming soon</i></div>

                        <div>Data Science and Machine Learning Terminology</div>
                        <div><Link href="https://datascience.terminology.me"><a className="text-sm">https://datascience.terminology.me</a></Link></div>

                        <div className="mt-4 text-sm">Created by <a href="https://michaelbrenndoerfer.com" target="_blank">Michael Brenndoerfer</a>
                            <a href="https://www.linkedin.com/in/michaelbrenndoerfer/" target="_blank"><span><AiFillLinkedin className="inline mx-1"></AiFillLinkedin></span></a>
                            <a href="https://github.com/Brenndoerfer" target="_blank"><span><AiFillGithub className="inline mx-1"></AiFillGithub></span></a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}