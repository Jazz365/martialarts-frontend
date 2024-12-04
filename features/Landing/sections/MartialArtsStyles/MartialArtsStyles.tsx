import React from 'react'
import styles from './styles.module.css'
import { dummyMartialStyles } from '@/utils/styles'
import Image from 'next/image'
import Link from 'next/link'
import FadeInOnScroll from '@/components/FadeInOnScroll/FadeInOnScroll'
import { listingViewTypes } from '@/features/Search/sections/Places/utils'


const MartialArtsStyles = () => {
    return <>
        <section className={styles.content__Wrap}>
            <FadeInOnScroll>
                <h2 className={styles.header}>Find your ideal martial art style</h2>
            </FadeInOnScroll>
            
            <FadeInOnScroll>
                <section className={styles.styles__Wrap}>
                    {
                        React.Children.toArray(
                            dummyMartialStyles
                            .filter(style => style.isFeatured === true)
                            .map(style => {
                                return <>
                                    <Link
                                        className={styles.style__Item__Detail}
                                        href={`/search?style=${encodeURIComponent(style.name)}&view=${listingViewTypes.listView}`}
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
            </FadeInOnScroll>
        </section>
    </>
}

export default MartialArtsStyles