import React from 'react'
import styles from './styles.module.css'
import mainHeroImg from '../../../../assets/heros/karate.png'
import heroImg1 from '../../../../assets/heros/judo.png'
import heroImg2 from '../../../../assets/heros/Kickboxing.png'
import heroImg3 from '../../../../assets/heros/Muay-Thai.png'
import heroImg4 from '../../../../assets/heros/taekwondo.png'
import heroImg5 from '../../../../assets/heros/Wrestling.png'
import Image from 'next/image'
import FadeInOnScroll from '@/components/FadeInOnScroll/FadeInOnScroll'


const HeroImagesWrap = () => {
    return <>
        <FadeInOnScroll 
            width='100%'
            viewThreshold={0.1}
        >
            <section className={styles.content__Wrap}>
                <Image 
                    className={`${styles.img__Content} ${styles.i_1}`}
                    alt='hero'
                    src={heroImg1}
                />
                
                <Image 
                    className={`${styles.img__Content} ${styles.i_2}`}
                    alt='hero'
                    src={heroImg2}
                />

                
                <Image 
                    className={`${styles.img__Content} ${styles.i_main}`}
                    alt='hero'
                    src={mainHeroImg}
                />

                <Image 
                    className={`${styles.img__Content} ${styles.i_3}`}
                    alt='hero'
                    src={heroImg5}
                />
                
                <Image 
                    className={`${styles.img__Content} ${styles.i_4}`}
                    alt='hero'
                    src={heroImg3}
                />

                <Image 
                    className={`${styles.img__Content} ${styles.i_5}`}
                    alt='hero'
                    src={heroImg4}
                />
            </section>
        </FadeInOnScroll>
    </>
}

export default HeroImagesWrap