import React from 'react'
import styles from './styles.module.css'
import { dummyMartialStyles } from '@/utils/utils'
import Image from 'next/image'
import Link from 'next/link'


const MartialArtsStyles = () => {
    return <>
        <section className={styles.content__Wrap}>
            <h2 className={styles.header}>Find your perfect martial art style</h2>

            <section className={styles.styles__Wrap}>
                {
                    React.Children.toArray(
                        dummyMartialStyles.map(style => {
                            return <>
                                <Link
                                    className={styles.style__Item__Detail}
                                    href={`/search?style=${style.name}`}
                                >
                                    <Image 
                                        src={style.imageUrl}
                                        alt={style.name}
                                        className={styles.style__Image}
                                    />

                                    <section className={styles.mask}>
                                        <h3 className={styles.style__Name}>{style.name}</h3>
                                    </section>
                                </Link>
                            </>
                        })
                    )
                }
            </section>
        </section>
    </>
}

export default MartialArtsStyles