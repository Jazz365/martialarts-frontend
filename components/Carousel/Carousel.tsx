import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import React, { CSSProperties } from 'react'
import styles from './styles.module.css'

const Carousel = ({
    children,
    style,
}: {
    style?: CSSProperties;
    children: React.ReactNode;
}) => {
    const [emblaRef] = useEmblaCarousel(
        {
            loop: true,
        },
        [Autoplay({
            delay: 3000,
        })],
    );

    return <>
        <div 
            className={styles.embla} 
            ref={emblaRef}
            style={style}
        >
            <div className={styles.embla__container}>
                {children}
            </div>
        </div>
    </>
}

export default Carousel