'use client';


import Link from 'next/link';
import React, { CSSProperties, useState } from 'react'
import styles from './styles.module.css';


const Button = ({
    label,
    style,
    icon,
    useLink=false,
    linkLocation='',
    disabled=false,
    handleClick=()=>{},
    hoverStyle,
}: {
    label: string;
    style?: CSSProperties;
    icon?: React.ReactNode;
    iconColor?: string;
    iconSize?: string;
    useLink?: boolean;
    linkLocation?: string;
    disabled?: boolean;
    handleClick?: () => void;
    hoverStyle?: CSSProperties;
}) => {
    const [ mouseOver, setMouseOver ] = useState(false);

    if (useLink === true) return <>
        <Link
            className={`${styles.btn}`}
            href={linkLocation}
            style={
                mouseOver ?
                    {
                        ...style,
                        ...hoverStyle,
                    }
                :
                style
            }
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
        >
            {
                icon ?? <></>
            }

            {
                label.length > 1 ?
                    <span>{label}</span>
                :
                <></>
            }
        </Link>
    </>
    
    return <>
        <button
            className={`${styles.btn}`}
            onClick={handleClick}
            disabled={disabled}
            style={
                mouseOver ?
                    {
                        ...style,
                        ...hoverStyle,
                    }
                :
                style
            }
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
        >
            {
                icon ?? <></>
            }

            {
                label.length > 1 ?
                    <span>{label}</span>
                :
                <></>
            }
        </button>
    </>
}

export default Button