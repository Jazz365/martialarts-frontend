import React from 'react'
import styles from './styles.module.css'
import HeroImagesWrap from '../../components/HeroImagesWrap/HeroImagesWrap';
import CategorySearchBar from '../../../../components/CategorySearchBar/CategorySearchBar';

const HeroBanner = () => {
    return <section className={styles.hero__Wrap}>
        <section className={styles.hero__Content__Wrap}>
            <section className={styles.header__Content}>
                <h1 className={styles.header}>
                    Your Martial Arts <br /> Journey Starts Here
                </h1>
                <p className={styles.subtitle__Header}>
                    Discover the perfect martial arts style tailored for you
                </p>
            </section>

            <CategorySearchBar />
        </section>

        <HeroImagesWrap />
    </section>
}

export default HeroBanner