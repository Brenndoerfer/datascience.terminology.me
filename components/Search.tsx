import { useEffect, useRef, useState, MutableRefObject } from 'react';
import { useHotkeys } from "react-hotkeys-hook";
import SearchItem, { Item } from './SearchItem';
import styles from "./Search.module.css"
import { FaSearch } from 'react-icons/fa'
import platform from 'platform-detect'
import Char from './Char';
import classNames from 'classnames';
import Link from 'next/link';

interface SearchProps {
    items: [Item]
}


export default function Search(props: SearchProps) {


    const searchFieldRef = useRef<HTMLInputElement>(null);

    const [items, setItems] = useState(props.items)
    const [charFilter, setCharFilter] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [allOn, setAllOn] = useState<boolean>(true);

    const ALPHABET = "ABCDEFGHJKLMNOPQRSTUVWXYZ";

    // const charStates = [...new Array(26)].map(() => false)
    // const charStates =  = ALPHABET.split('').map(item)

    // console.log(charStates);


    useHotkeys('cmd+k', () => searchFieldRef?.current?.focus());
    useHotkeys('ctrl+k', () => searchFieldRef?.current?.focus());


    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.keyCode === 27) {
                searchFieldRef?.current?.blur()
            }
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    function platformShortcut() {
        if (platform.windows) {
            return "(CTRL+K)"
        }
        if (platform.macos) {
            return "(⌘+K)"
        }
        return ""
    }

    function handleCharClick(char: string) {
        let newState = { ...charFilter }

        if (newState.hasOwnProperty(char)) {
            delete newState[char]
        } else {
            newState[char] = true;
            setAllOn(false);
        }

        setCharFilter(newState);
    }

    function letterFilter() {
        return ALPHABET
            .split('')
            .map<React.ReactNode>(char => (
                <Char
                    key={char}
                    char={char}
                    style={classNames(styles.letter, { [styles.activeLetter]: charFilter.hasOwnProperty(char.toLowerCase()) })}
                    onPress={handleCharClick}
                // active={charFilter.hasOwnProperty(char.toLowerCase())}
                />
            ))
    }
    function handleAllClick() {
        setCharFilter({});
        setAllOn(true);
        setSearchTerm('')
    }

    var lastChar = "";

    function filterItems() {
        var result = items
            .filter(item => {

                let keys = Object.keys(charFilter);

                if (keys.length == 0) return item
                else {
                    let firstChar: string = item?.data?.title?.toLowerCase().substring(0, 1)
                    if (Object.keys(charFilter).includes(firstChar)) {
                        return item
                    }
                }

            })
            .filter(item => {
                console.log(item.data.title.toLowerCase().startsWith(charFilter))
                return (
                    (
                        item?.data?.title?.toLowerCase().includes(searchTerm) ||
                        item?.data?.abrv?.toLowerCase().includes(searchTerm) ||
                        item?.excerpt?.toLowerCase().includes(searchTerm)
                    )
                )
            }).map((item) => {

                let currChar = item.data.title.substring(0, 1).toLowerCase();
                let splitter = lastChar !== currChar;
                lastChar = currChar;

                return (
                    <div key={item.hash + 'wrapper'}>
                        {splitter ? (
                            <div className="text-center mt-8">
                                <span id={currChar} className="text-2xl font-medium text-gray-900" key={'hash' + currChar}>{currChar.toUpperCase()}<br /></span>
                                <div className="text-center inline-block h-1 w-20 bg-indigo-500 rounded mb-2"></div>
                            </div>
                        )
                            : ''}
                        <SearchItem key={item.hash} item={item} resetHandler={handleAllClick} />
                    </div>
                )
            })

        if (result.length == 0) {
            result = (
                <div className="text-center text-md text-gray-500 shadow-md bg-white rounded w-auto">
                    <div className=" p-4 border-indigo-200 border">
                        <div className="my-8">
                            No results found
                        </div>
                        <div className="my-8"><button className="" onClick={() => handleAllClick()}>Show Me All</button></div>
                    </div>
                </div>
            )
        }

        return result;
    }

    return (
        <>
            <div className="relative flex w-full flex-wrap items-stretch bg-white rounded  shadow-xl -mt-28 md:-mt-20">
                <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 
                bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-4">
                    <FaSearch className="text-gray-600" />
                </span>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value.toLowerCase())}

                    placeholder={`Search ... ${platformShortcut()}`}
                    ref={searchFieldRef}
                    className="p-3 text-lmd rounded-t placeholder-gray-500 text-gray-900 relative
                    border border-indigo-200 focus:bg-white focus:ring-indigo-200 focus:border-indigo-500
                     outline-none focus:outline-none focus:ring w-full pl-10"
                />
                <div className="px-2 pt-1 pb-2 w-full border-indigo-200 border-b border-r border-l rounded-b">
                    <div className="text-sm text-center">
                        <a
                            href="#"
                            key="hashall"
                            className={classNames(styles.letter, { [styles.activeLetter]: Object.keys(charFilter).length == 0 })}
                            onClick={() => handleAllClick()}>
                            ALL
                        </a>
                        {letterFilter()}
                    </div>
                </div>
            </div>

            {/* <div><pre>{JSON.stringify(charFilter)}</pre></div> */}

            <div className="mt-4">{filterItems()}</div>

        </>
    )
}