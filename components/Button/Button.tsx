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
    isLeadingIcon=true,
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
    isLeadingIcon?: boolean;
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
                icon && isLeadingIcon === true ?
                    icon
                : 
                <></>
            }

            {
                label.length > 1 ?
                    <span>{label}</span>
                :
                <></>
            }

            {
                icon && isLeadingIcon === false ?
                    icon
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
                icon && isLeadingIcon === true ?
                    icon
                : 
                <></>
            }

            {
                label.length > 1 ?
                    <span>{label}</span>
                :
                <></>
            }

            {
                icon && isLeadingIcon === false ?
                    icon
                : 
                <></>
            }
        </button>
    </>
}

export default Button