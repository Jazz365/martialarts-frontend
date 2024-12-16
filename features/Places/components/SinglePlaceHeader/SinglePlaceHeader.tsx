import React from 'react'
import { IoStarOutline } from 'react-icons/io5';
import styles from './styles.module.css'


const SinglePlaceHeader = ({
    place
}: {
    place: IPlace;
}) => {
    return (
        <section className={styles.header}>
            <h1 className={styles.title}>{place.name}</h1>

            <section className={styles.details}>
                <p className={styles.detail__Item}>
                    <IoStarOutline />
                    <span>{place.average_rating}</span>
                </p>

                <p className={styles.detail__Item}>
                    <span>{place?.reviews?.length ?? 0}</span>
                    <span>reviews</span>
                </p>

                <p className={styles.detail__Item}>${place.pricing}/month</p>
            </section>
        </section>
    )
}

export default SinglePlaceHeader