import React from 'react'
import styles from './styles.module.css'
import mainHeroImg from '../../../../assets/heros/main.webp'
import teensImg1 from '../../../../assets/heros/teens-1.webp'
import teensImg2 from '../../../../assets/heros/teens-2.webp'
import teensImg3 from '../../../../assets/heros/teens-3.webp'
import teensImg4 from '../../../../assets/heros/teens-4.webp'
import people from '../../../../assets/heros/people.webp'
import Image from 'next/image'
import FadeInOnScroll from '@/components/FadeInOnScroll/FadeInOnScroll'


const HeroImagesWrap = () => {
    return <>
        <FadeInOnScroll 
            width='100%'
            viewThreshold={0.2}
        >
            <section className={styles.content__Wrap}>
                <Image 
                    className={`${styles.img__Content} ${styles.i_1}`}
                    alt='hero'
                    src={teensImg1}
                />
                
                <Image 
                    className={`${styles.img__Content} ${styles.i_2}`}
                    alt='hero'
                    src={teensImg2}
                />

                
                <Image 
                    className={`${styles.img__Content} ${styles.i_main}`}
                    alt='hero'
                    src={mainHeroImg}
                />

                <Image 
                    className={`${styles.img__Content} ${styles.i_3}`}
                    alt='hero'
                    src={people}
                />
                
                <Image 
                    className={`${styles.img__Content} ${styles.i_4}`}
                    alt='hero'
                    src={teensImg3}
                />

                <Image 
                    className={`${styles.img__Content} ${styles.i_5}`}
                    alt='hero'
                    src={teensImg4}
                />
            </section>
        </FadeInOnScroll>
    </>
}

export default HeroImagesWrap