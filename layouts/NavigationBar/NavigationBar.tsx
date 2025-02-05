import React, { CSSProperties } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import NavigationBarContent from './details'
import MemoizedImage from '@/components/common/MemoizedImage/MemoizedImage'


const NavigationBar = ({
    showSearchBar=false,
    wrapperStyle={},
    className
}: {
    showSearchBar?: boolean;
    wrapperStyle?: CSSProperties;
    className?: string;
}) => {
    return <>
        <nav 
            className={`${styles.nav__Wrapper} ${className ?? ''}`}
            style={wrapperStyle}
        >
            <Link 
                href={'/'}
            >
                <MemoizedImage 
                    src={'/logo-new.png'}
                    alt='logo'
                    width={180}
                    height={25}
                    className={styles.logo}
                    priority
                />
            </Link>

            <NavigationBarContent 
                showSearchBar={showSearchBar}
            />
        </nav>
    </>
}

export default NavigationBar