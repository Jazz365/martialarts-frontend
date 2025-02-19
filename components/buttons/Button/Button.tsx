'use client';


import Link from 'next/link';
import React, { CSSProperties, forwardRef, useState } from 'react'
import styles from './styles.module.css';


const Button = forwardRef(({
    label,
    style={},
    icon,
    useLink=false,
    linkLocation='',
    disabled=false,
    handleClick=()=>{},
    hoverStyle,
    isLeadingIcon=true,
    className='',
    rel,
    target,
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
    className?: string;
    rel?: string;
    target?: string;
}, ref) => {
    const [ mouseOver, setMouseOver ] = useState(false);

    if (useLink === true) return <>
        <Link
            className={`${styles.btn} ${className ?? ''}`}
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
            rel={rel}
            target={target}
            ref={ref as React.Ref<HTMLAnchorElement>}
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
            className={`${styles.btn} ${className ?? ''}`}
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
            ref={ref as React.Ref<HTMLButtonElement>}
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
});

export default Button