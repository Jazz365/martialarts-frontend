'use client';

import React, { ReactNode } from 'react'
import styles from './styles.module.css'
import { useInView } from 'react-intersection-observer'


const FadeInOnScroll = ({
    children,
    width,
    viewThreshold=0.65,
}: {
    children: ReactNode;
    width?: string;
    viewThreshold?: number;
}) => {
    const { ref, inView } = useInView({
        threshold: viewThreshold,
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