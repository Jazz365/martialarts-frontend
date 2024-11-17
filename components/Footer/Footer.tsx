import React from 'react'
import styles from './styles.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { IoLogoInstagram } from 'react-icons/io'
import { IoLogoFacebook } from 'react-icons/io5'
import { dummyMartialStyles } from '@/utils/utils'

const Footer = () => {
    return <>
        <footer className={styles.footer}>
            <section className={styles.logo__Wrap}>
                <Image 
                    src={'/logo-new.png'}
                    alt='logo'
                    width={180}
                    height={25}
                    className={styles.logo}
                />
                <p className={styles.logo__Subtitle}>Discover the best martial places tailored to your preferences</p>
            </section>

            <section className={styles.footer__Content}>
                <section className={styles.footer__Content__Wrap}>
                    <h4 className={styles.header}>Company</h4>

                    <ul className={styles.footer__Links}>
                        <li>
                            <Link href={''}>About Us</Link>
                        </li>
                        <li>
                            <Link href={''}>Careers</Link>
                        </li>
                        <li>
                            <Link href={''}>Pricing</Link>
                        </li>
                        <li>
                            <Link href={''}>Blog</Link>
                        </li>
                    </ul>
                </section>

                <section className={styles.footer__Content__Wrap}>
                    <h4 className={styles.header}>Popular Styles</h4>

                    <ul className={styles.footer__Links}>
                        {
                            React.Children.toArray(dummyMartialStyles.map(style => {
                                return <li>
                                    <Link href={''}>{style.name}</Link>
                                </li>
                            }))
                        }
                    </ul>
                </section>

                <section className={styles.footer__Content__Wrap}>
                    <h4 className={styles.header}>Contact Us</h4>

                    <ul className={styles.footer__Links}>
                        <li>
                            <Link href={''}>Email: dummy@dummy.com</Link>
                        </li>
                        <li>
                            <Link href={''}>Phone: +911 911 911</Link>
                        </li>
                    </ul>

                    <section className={styles.footer__Icons}>
                        <IoLogoInstagram size={'2rem'} />

                        <IoLogoFacebook size={'2rem'} />
                    </section>
                </section>
            </section>
        </footer>
    </>
}

export default Footer