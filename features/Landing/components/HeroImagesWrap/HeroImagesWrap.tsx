import React, { memo } from 'react'
import styles from './styles.module.css'
import mainHeroImg from '../../../../assets/heros/karate.webp'
import heroImg3 from '../../../../assets/heros/Muay-Thai.webp'
import heroImg6 from '../../../../assets/heros/boxing.webp'
import heroImg7 from '../../../../assets/heros/sambo.webp'
import heroImg5 from '../../../../assets/heros/Wrestling.webp'
import FadeInOnScroll from '@/components/wrapperComponents/FadeInOnScroll/FadeInOnScroll'
import MemoizedImage from '@/components/common/MemoizedImage/MemoizedImage'


const HeroImagesWrap = memo(() => {
    return <>
        <FadeInOnScroll 
            width='100%'
            viewThreshold={0.1}
        >
            <section className={styles.content__Wrap}>
                <MemoizedImage 
                    className={`${styles.img__Content} ${styles.i_1}`}
                    alt='hero'
                    src={heroImg6}
                    // priority={true}
                />
                
                <MemoizedImage 
                    className={`${styles.img__Content} ${styles.i_2}`}
                    alt='hero'
                    src={heroImg3}
                    // priority={true}
                />

                
                <MemoizedImage 
                    className={`${styles.img__Content} ${styles.i_main}`}
                    alt='hero'
                    src={mainHeroImg}
                    priority={true}
                />

                <MemoizedImage 
                    className={`${styles.img__Content} ${styles.i_3}`}
                    alt='hero'
                    src={heroImg5}
                    // priority={true}
                />
                
                <MemoizedImage 
                    className={`${styles.img__Content} ${styles.i_4}`}
                    alt='hero'
                    src={heroImg7}
                    // priority={true}
                />
            </section>
        </FadeInOnScroll>
    </>
})

export default HeroImagesWrap