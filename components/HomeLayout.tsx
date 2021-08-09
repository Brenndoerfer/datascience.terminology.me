export default function HomeLayout({ children }) {
    return (
        <>
            <main className="bg-indigo-50 pb-16">
                <div className="max-w-6xl mx-auto p-4">
                    {children}
                </div>
            </main>
        </>
    )
}