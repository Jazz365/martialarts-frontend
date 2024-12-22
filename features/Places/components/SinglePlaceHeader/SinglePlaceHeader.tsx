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
                <p className={styles.detail__Item}>${place.pricing}/month</p>
        
                <p className={styles.detail__Item}>
                    <span>Styles offered:</span>
                    <span>{place.place_styles.map(style => style.name).join(', ')}</span>
                </p>

                <p className={styles.detail__Item}>
                    <span>Skill levels:</span>
                    <span>{place.place_caters_to.map(style => style.name).join(', ')}</span>
                </p>

                <p className={styles.detail__Item}>
                    <span>Age groups:</span>
                    <span>All</span>
                </p>
            </section>
        </section>
    )
}

export default SinglePlaceHeader