import React from 'react'
import styles from './styles.module.css'
import { dummyFeaturedLocations } from './utils'
import Link from 'next/link'
import FadeInOnScroll from '@/components/wrapperComponents/FadeInOnScroll/FadeInOnScroll'
import { listingSortOptions, listingViewTypes } from '@/features/Search/sections/Places/utils'
import MemoizedImage from '@/components/common/MemoizedImage/MemoizedImage'
import Button from '@/components/buttons/Button/Button'


const FeaturedLocations = () => {
    return <>
        <section className={styles.content__Wrap}>
            <FadeInOnScroll>
                <section className={styles.header__Wrap}>
                    <h2 className={styles.header}>Explore martial arts near you</h2>

                    <Button
                        label='more'
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
                        className={styles.more__Btn__Lg}
                    />
                </section>
            </FadeInOnScroll>

            <FadeInOnScroll>
                <section className={styles.locations__Wrap}>
                    {
                        React.Children.toArray(dummyFeaturedLocations.map((location, index) => {
                            return <Link
                                key={location.id}
                                href={`/search?place=${location.name}&view=${listingViewTypes.listView}&sort=${listingSortOptions.sort_by_newest}`}
                                className={`${styles.location__Item} ${index === 0 ? styles.main : ''}`}
                            >
                                <MemoizedImage 
                                    src={location.image}
                                    alt={location.name}
                                    className={styles.location__Image}
                                    // priority
                                />

                                <section className={styles.location__Details}>
                                    <h3 className={`${styles.header}`}>{location.name}</h3>

                                    {/* <p className={styles.location__Place__Count}>
                                        <IoLocateOutline />
                                        <span>{location.totalPlaces} places</span>
                                    </p> */}
                                </section>
                            </Link>
                        }))
                    }
                </section>
            </FadeInOnScroll>

            <Button
                label='more'
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
                className={styles.more__Btn__Sm}
            />
        </section>
    </>
}

export default FeaturedLocations