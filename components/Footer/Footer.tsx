import React from 'react'
import styles from './styles.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { dummyMartialStyles } from '@/utils/utils'
import facebookIcon from '../../assets/icons/facebook.png'
import instagramIcon from '../../assets/icons/instagram.png'
import tiktokIcon from '../../assets/icons/tiktok.png'

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
                <p className={styles.logo__Subtitle}>
                    Bringing You the Best Martial Arts Studios and Classes Near You
                </p>
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
                        <Image 
                            src={facebookIcon}
                            alt='facebook'
                            className={styles.footer__Icon}
                        />

                        <Image 
                            src={instagramIcon}
                            alt='instagram'
                            className={styles.footer__Icon}
                        />

                        <Image 
                            src={tiktokIcon}
                            alt='tiktok'
                            className={styles.footer__Icon}
                        />
                    </section>
                </section>
            </section>
        </footer>
    </>
}

export default Footer