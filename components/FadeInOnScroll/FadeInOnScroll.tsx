'use client';

import React, { ReactNode } from 'react'
import styles from './styles.module.css'
import { useInView } from 'react-intersection-observer'


const FadeInOnScroll = ({
    children,
    width,
}: {
    children: ReactNode;
    width?: string;
}) => {
    const { ref, inView } = useInView({
        threshold: 0.65,
        triggerOnce: true,
    });

    return (
        <div
            ref={ref}
            className={`${styles.section__Wrap} ${inView ? styles.in__View : ''}`}
            style={{
                width,
            }}
        >
            {children}
        </div>
    )
}

export default FadeInOnScroll