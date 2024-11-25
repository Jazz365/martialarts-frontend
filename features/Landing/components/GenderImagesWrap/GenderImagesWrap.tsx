'use client';

import React, { useState } from 'react'
import styles from './styles.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { bannerImgsInfo } from '../../sections/HeroBanner/utils';


const GenderImagesWrap = () => {
    const [ activeImg, setActiveImg ] = useState<number>(1);

    return <>
        <section className={styles.images__Wrap}>
            {
                React.Children.toArray(bannerImgsInfo.map(bannerItem => {
                    return <Link
                        className={`
                            ${styles.banner__Wrap}
                            ${
                                activeImg === bannerItem.id ?
                                    styles.main
                                :
                                ''
                            }
                        `}
                        href={bannerItem.location}
                        onMouseEnter={
                            () => setActiveImg(bannerItem.id)
                        }
                        onMouseLeave={
                            () => setActiveImg(1)
                        }
                        key={bannerItem.id}
                    >
                        <Image
                            src={bannerItem.imageUrl}
                            alt={`${bannerItem.title} hero illustration`}
                            className={`${styles.banner__Image}`}
                            priority
                        />
                        
                        <div 
                            className={styles.mask}
                        >
                            <p className={styles.banner__Text}>
                                {bannerItem.title}
                            </p>
                        </div>
                    </Link>
                }))
            }
        </section>
    </>
}

export default GenderImagesWrap