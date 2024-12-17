import React from 'react'
import styles from './styles.module.css'
import { IoIosArrowRoundForward } from 'react-icons/io'
// import happyIllustration from '../../../../assets/happy.svg'
import astronaut from '../../../../assets/astr.png'
import Image from 'next/image'
import FadeInOnScroll from '@/components/FadeInOnScroll/FadeInOnScroll'

const Banner = () => {
    return <>
        <FadeInOnScroll>
            <section className={styles.content__Wrap}>
                <section className={styles.banner}>
                    <section className={styles.banner__Text}>
                        <section className={styles.banner__Header}>
                            <h2 className={styles.header}>List your space</h2>

                            <p className={styles.info}>It is easy to list, simple to manage</p>
                        </section>

                        <button className={styles.get__Started__Btn}>
                            <span>Get started</span>
                            <IoIosArrowRoundForward size={'1.5rem'} />
                        </button>
                    </section>

                    <Image 
                        alt={'banner illustration'}
                        src={astronaut}
                        className={styles.banner__Img}
                    />
                </section>
            </section>
        </FadeInOnScroll>
    </>
}

export default Banner