import React from 'react'
import styles from './styles.module.css'
import HeroImagesWrap from '../../components/HeroImagesWrap/HeroImagesWrap';
import CategorySearchBar from '../../../../components/CategorySearchBar/CategorySearchBar';
// import HeroBannerSubtitle from '../../components/HeroBannerSubtitle/HeroBannerSubtitle';

const HeroBanner = () => {
    return <section className={styles.hero__Wrap}>
        <section className={styles.hero__Content__Wrap}>
            <section className={styles.header__Content}>
                <h1 className={styles.header}>
                    Discover & Book martial arts classes near you!
                </h1>

                {/* <HeroBannerSubtitle /> */}
            </section>

            <CategorySearchBar />
        </section>

        <HeroImagesWrap />
    </section>
}

export default HeroBanner