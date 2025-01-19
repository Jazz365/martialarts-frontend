'use server'

import React from 'react'
import styles from './styles.module.css'
import HeroImagesWrap from '../../components/HeroImagesWrap/HeroImagesWrap';
import CategorySearchBar from '../../../../components/CategorySearchBar/CategorySearchBar';
import heroImg1 from '../../../../assets/heros/judo.webp'
import heroImg4 from '../../../../assets/heros/taekwondo.webp'
import MemoizedImage from '@/components/MemoizedImage/MemoizedImage';

const HeroBanner = () => {
    return <section className={styles.hero__Wrap}>
        <section className={styles.hero__Content__Wrap}>
            <section className={styles.header__Content}>
                <MemoizedImage 
                    className={`${styles.img__Content} ${styles.i_1}`}
                    alt='hero'
                    src={heroImg4}
                    // priority={true}
                />

                <h1 className={styles.header}>
                    Discover & Book martial arts classes near you!
                </h1>

                {/* <HeroBannerSubtitle /> */}
                
                <MemoizedImage 
                    className={`${styles.img__Content} ${styles.i_2}`}
                    alt='hero'
                    src={heroImg1}
                    // priority={true}
                />
            </section>

            <CategorySearchBar />
        </section>

        <HeroImagesWrap />
    </section>
}

export default HeroBanner