export default function TermLayout({ children }) {
    return (
        <>
            <main className="bg-indigo-50">
                <div className="container mx-auto flex flex-wrap flex-col pt-8 ">
                    {children}
                </div>
            </main>
        </>
    )
}