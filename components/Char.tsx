import { useState } from "react";
import styles from "./Search.module.css"
import classNames from 'classnames';

export default function Char(props) {

    // const [active, setActive] = useState<boolean>(false);

    const char = props.char.toLowerCase();

    // function handleClick() {
    //     props.onPress(char)
    //     setActive(!active)
    // }

    return (
        <>
            <a
                className={props.style}
                href={'#'}
                onClick={() => props.onPress(char)}
                key={char}>{char.toUpperCase()}
            </a>
        </>

    )
}