import React from 'react'
import styles from './styles.module.css'
import { dummyFeaturedLocations } from './utils'
import Link from 'next/link'
import Image from 'next/image'
import { IoLocateOutline } from 'react-icons/io5'


const FeaturedLocations = () => {
    return <>
        <section className={styles.content__Wrap}>
            <h2 className={styles.header}>Explore by Location</h2>

            <section className={styles.locations__Wrap}>
                {
                    React.Children.toArray(dummyFeaturedLocations.map(location => {
                        return <Link
                            key={location.id}
                            href={`/search?location=${location.name}`}
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
        </section>
    </>
}

export default FeaturedLocations