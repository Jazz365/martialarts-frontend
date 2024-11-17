import React from 'react'
import styles from './styles.module.css'
import { IoIosArrowRoundForward } from 'react-icons/io'
import happyIllustration from '../../../../assets/happy.svg'
import Image from 'next/image'

const Banner = () => {
    return <>
        <section className={styles.content__Wrap}>
            <section className={styles.banner}>
                <section className={styles.banner__Text}>
                    <section className={styles.banner__Header}>
                        <h2 className={styles.header}>List your space</h2>

                        <p className={styles.info}>It is easy to list, simple to manage</p>
                    </section>

                    <button className={styles.get__Started__Btn}>
                        <span>Get started</span>
                        <IoIosArrowRoundForward />
                    </button>
                </section>

                <Image 
                    alt={'banner illustration'}
                    src={happyIllustration}
                    className={styles.banner__Img}
                />
            </section>
        </section>
    </>
}

export default Banner