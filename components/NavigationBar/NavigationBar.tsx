import Image from 'next/image'
import React from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import { IoAddOutline } from 'react-icons/io5'


const NavigationBar = () => {
    return <>
        <nav className={styles.nav__Wrapper}>
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

            <section className={styles.nav__Actions}>
                <Link
                    className={`${styles.btn}`}
                    href={'/login'}
                >
                    <span>Login</span>
                </Link>

                <Link
                    className={`${styles.btn} ${styles.add__Btn}`}
                    href={'/login?next=add-place'}
                >
                    <IoAddOutline
                        color='#fff'
                        size={'1.1rem'}
                    />

                    <span>boost your studio</span>
                </Link>
            </section>
        </nav>
    </>
}

export default NavigationBar