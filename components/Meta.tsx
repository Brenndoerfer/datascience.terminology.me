import Head from 'next/head';

export default function Meta() {
    return (
        <>
            <Head>
                <title>Data Science & Machine Learning | Terminology.me</title>
                <meta name="description" content="Machine Learning and Data Science Terminology Explained" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:site_name" content="Machine Learning and Data Science Terminology" />
                <meta property="og:title” content=Machine Learning and Data Science Terminology" />
                <meta property="og:description" content="Compact and easy to understand explanation of all data science abd machine learning related terms" />
                <meta property="og:url" content="https://datascience.terminology.me" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://datascience.terminology.me/assets/og/og_cover.jpg" />
                <meta property="og:image:secure_url" content="https://datascience.terminology.me/assets/og/og_cover.jpg" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:image" content="https://datascience.terminology.me/assets/og/og_cover.jpg" />

                <link rel="icon" href="/favicon.ico" />

                <script async src="https://www.googletagmanager.com/gtag/js?id=G-WG49HJC07Y"></script>
                <script dangerouslySetInnerHTML={{
                    __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'G-WG49HJC07Y');`}} />

            </Head>

        </>
    )
}