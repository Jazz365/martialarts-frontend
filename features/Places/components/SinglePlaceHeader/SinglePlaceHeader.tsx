import React from 'react'
import styles from './styles.module.css'
import { formatPricingType } from '@/app/dashboard/[type]/studios/add-studio/utils';


const SinglePlaceHeader = ({
    place
}: {
    place: IPlace;
}) => {
    return (
        <section className={styles.header}>
            <h1 className={styles.title}>{place.name}</h1>

            <section className={styles.details}>
                {
                    place.free_lesson_available === true &&
                    <p className={styles.detail__Item}>
                        <span>Free trial class available</span>    
                    </p>
                }

                <p className={styles.detail__Item}>${place.pricing}/{place.pricing_type ? formatPricingType(place.pricing_type) : 'month'}</p>
        
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
                    <span>{place?.place_age_groups?.map(item => item.name).join(', ')}</span>
                </p>
            </section>
        </section>
    )
}

export default SinglePlaceHeader