import Link from 'next/link';
import { AiOutlineArrowUp } from 'react-icons/ai';
import classNames from 'classnames';
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';


export default function GoToTop() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const position = window.pageYOffset;
        setScrollPosition(position);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Link href='/#top' scroll={true}>
                <a className={classNames(styles.scrollTopBtn, { [styles.showScrollTopBtn]: scrollPosition > 200 })} title="Go to top">
                    <AiOutlineArrowUp className="inline mb-1" />
                </a>
            </Link>
        </>
    )
}