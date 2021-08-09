import Select from 'react-select'
import { platformShortcut, handleEsc } from '../lib/platform';
import { useRef, useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { Item } from '../lib/IItemData';
import { getAllItems } from '../lib/loader';
import { useRouter } from 'next/router';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

export default function NavbarSearch({ terms }: { terms: Item[] }) {

    const router = useRouter()

    const options = terms.map(term => { return { value: term.slug, label: term.data.title } })

    const searchFieldRef = useRef(null);
    useHotkeys('cmd+k', () => searchFieldRef?.current?.focus());
    useHotkeys('ctrl+k', () => searchFieldRef?.current?.focus());

    useEffect(() => handleEsc(searchFieldRef), []);

    function handleChange(value) {
        let url = `/term/${value.value}`
        // router.push(url, undefined, { shallow: false })
        window.location = url
    }

    return (
        <>
            <Select options={options}
                instanceId="TermSearchbar"
                ref={searchFieldRef}
                onChange={handleChange}
                placeholder={'Search more terms ... ' + platformShortcut()}
            />
        </>
    )
}
