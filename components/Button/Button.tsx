'use client';


import Link from 'next/link';
import React, { CSSProperties } from 'react'
import styles from './styles.module.css';


const Button = ({
    label,
    style,
    icon,
    useLink=false,
    linkLocation='',
    disabled=false,
    handleClick=()=>{},
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
}) => {
    if (useLink === true) return <>
        <Link
            className={`${styles.btn}`}
            href={linkLocation}
            style={style}
        >
            {
                icon ?? <></>
            }

            <span>{label}</span>
        </Link>
    </>
    
    return <>
        <button
            className={`${styles.btn}`}
            style={style}
            onClick={handleClick}
            disabled={disabled}
        >
            {
                icon ?? <></>
            }

            <span>{label}</span>
        </button>
    </>
}

export default Button