import React from 'react'
import styles from './styles.module.css'
import { dummyMartialStyles } from '@/utils/styles'
import Image from 'next/image'
import Link from 'next/link'
import FadeInOnScroll from '@/components/FadeInOnScroll/FadeInOnScroll'
import { listingSortOptions, listingViewTypes } from '@/features/Search/sections/Places/utils'
import Button from '@/components/Button/Button'


const MartialArtsStyles = () => {
    return <>
        <section className={styles.content__Wrap}>
            <FadeInOnScroll>
                <h2 className={styles.header}>Find your ideal martial art style</h2>
            </FadeInOnScroll>
            
            <section className={styles.styles__Wrap}>
                {
                    React.Children.toArray(
                        dummyMartialStyles
                        .filter(style => style.isFeatured === true)
                        .map(style => {
                            return <>
                                <FadeInOnScroll 
                                    viewThreshold={0.5}
                                    className={styles.style__Item__Detail}
                                    key={style.id}
                                >
                                    <Link
                                        href={`/search?style=${encodeURIComponent(style.name)}&view=${listingViewTypes.listView}&sort=${listingSortOptions.sort_by_newest}`}
                                    >
                                        
                                        <Image 
                                            src={style.imageUrl}
                                            alt={style.name}
                                            className={styles.style__Image}
                                            // priority
                                        />

                                        <section className={styles.mask}>
                                            <h3 className={styles.style__Name}>{style.name}</h3>
                                        </section>
                                    </Link>
                                </FadeInOnScroll>
                            </>
                        })
                    )
                }
            </section>

            <Button 
                label='more categories'
                style={{
                    width: 'max-content',
                    background: 'transparent',
                    color: '#000',
                    border: '1px solid #000',
                }}
                useLink
                linkLocation='/search'
                hoverStyle={{
                    background: '#000',
                    color: '#fff'
                }}
            />
        </section>
    </>
}

export default MartialArtsStyles