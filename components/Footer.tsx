import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';

export default function Footer() {
    return (
        <>
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
        </>
    )
}