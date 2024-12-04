import React from 'react'
import styles from './styles.module.css'
import { dummyFeaturedLocations } from './utils'
import Link from 'next/link'
import Image from 'next/image'
import { IoLocateOutline } from 'react-icons/io5'
import FadeInOnScroll from '@/components/FadeInOnScroll/FadeInOnScroll'
import { listingViewTypes } from '@/features/Search/sections/Places/utils'


const FeaturedLocations = () => {
    return <>
        <section className={styles.content__Wrap}>
            <FadeInOnScroll>
                <h2 className={styles.header}>Explore martial arts near you</h2>
            </FadeInOnScroll>

            <FadeInOnScroll>
                <section className={styles.locations__Wrap}>
                    {
                        React.Children.toArray(dummyFeaturedLocations.map(location => {
                            return <Link
                                key={location.id}
                                href={`/search?location=${location.name}&view=${listingViewTypes.listView}`}
                                className={styles.location__Item}
                            >
                                <Image 
                                    src={location.image}
                                    alt={location.name}
                                    className={styles.location__Image}
                                />

                                <section className={styles.location__Details}>
                                    <h3 className={`${styles.header}`}>{location.name}</h3>

                                    <p className={styles.location__Place__Count}>
                                        <IoLocateOutline />
                                        <span>{location.totalPlaces} places</span>
                                    </p>
                                </section>
                            </Link>
                        }))
                    }
                </section>
            </FadeInOnScroll>
        </section>
    </>
}

export default FeaturedLocations