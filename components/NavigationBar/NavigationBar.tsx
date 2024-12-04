import Image from 'next/image'
import React, { CSSProperties } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import { IoAddOutline } from 'react-icons/io5'
import Button from '../Button/Button'
import CategorySearchBar from '../CategorySearchBar/CategorySearchBar'


const NavigationBar = ({
    showSearchBar=false,
    wrapperStyle={},
}: {
    showSearchBar?: boolean;
    wrapperStyle?: CSSProperties;
}) => {
    return <>
        <nav 
            className={styles.nav__Wrapper}
            style={wrapperStyle}
        >
            <Link 
                href={'/'}
            >
                <Image 
                    src={'/logo-new.png'}
                    alt='logo'
                    width={180}
                    height={25}
                    className={styles.logo}
                    priority
                />
            </Link>

            {
                showSearchBar &&
                <CategorySearchBar
                    hideTrendingStyles={true}
                    wrapperStyle={{
                        width: '35%',
                    }}
                    searchBarStyle={{
                        padding: '0.75rem 0.75rem 0.75rem 1.5rem',
                        width: '100%',
                    }}
                />
            }

            <section className={styles.nav__Actions}>
                <Button 
                    label='login'
                    style={{
                        backgroundColor: 'transparent',
                        color: '#000',
                        fontWeight: '500',
                    }}
                    useLink={true}
                    linkLocation='/login'
                />

                <Button 
                    label='boost your studio'
                    icon={
                        <IoAddOutline 
                            color='#fff'
                            size='1.1rem'
                        />
                    }
                    useLink={true}
                    linkLocation={'/login?next=add-place'}
                />
            </section>
        </nav>
    </>
}

export default NavigationBar