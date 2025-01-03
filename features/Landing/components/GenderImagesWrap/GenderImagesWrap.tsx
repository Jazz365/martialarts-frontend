'use client';

import React, { useState } from 'react'
import styles from './styles.module.css'
import Image from 'next/image';
import Link from 'next/link';
import { genderImgsInfo } from './utils';


const GenderImagesWrap = () => {
    const [ activeImg, setActiveImg ] = useState<number>(1);

    return <>
        <section className={styles.images__Wrap}>
            {
                React.Children.toArray(genderImgsInfo.map(genderItem => {
                    return <Link
                        className={`
                            ${styles.banner__Wrap}
                            ${
                                activeImg === genderItem.id ?
                                    styles.main
                                :
                                ''
                            }
                        `}
                        href={genderItem.location}
                        onMouseEnter={
                            () => setActiveImg(genderItem.id)
                        }
                        onMouseLeave={
                            () => setActiveImg(1)
                        }
                        key={genderItem.id}
                    >
                        <Image
                            src={genderItem.imageUrl}
                            alt={`${genderItem.title} hero illustration`}
                            className={`${styles.banner__Image}`}
                            // priority
                        />
                        
                        <div 
                            className={styles.mask}
                        >
                            <p className={styles.banner__Text}>
                                {genderItem.title}
                            </p>
                        </div>
                    </Link>
                }))
            }
        </section>
    </>
}

export default GenderImagesWrap