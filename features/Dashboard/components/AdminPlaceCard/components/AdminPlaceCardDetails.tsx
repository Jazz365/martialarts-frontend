import { useAppContext } from '@/contexts/AppContext/AppContext';
import React from 'react'
import styles from '../styles.module.css'


const AdminPlaceCardDetails = ({
    place
}: {
    place: IPlace;
}) => {
    const {
        placeTypes,
    } = useAppContext();

    const [
        placeStyles,
        placeCatersTo,
        placeType
      ] = [
        `${place.place_styles.map(style => style.name).join(', ')}`,
        `${place.place_caters_to.map(cat => cat.name).join(', ')}`,
        placeTypes.find(type => type.id === place.type_of_place)?.name ?? ''
    ]
    return (
        <section className={styles.admin__Place__Card__Detail}>
            <p className={styles.card__Detail__Item}>
                <span className={styles.detail__Title}>Styles offered</span>
                <span className={styles.detail__Info}>{placeStyles}</span>
            </p>
            <p className={styles.card__Detail__Item}>
                <span className={styles.detail__Title}>Skill levels</span>
                <span className={styles.detail__Info}>{placeCatersTo}</span>
            </p>

            <p className={styles.card__Detail__Item}>
                <span className={styles.detail__Title}>Place type</span>
                <span className={styles.detail__Info}>{placeType}</span>
            </p>
            
            <p className={styles.card__Detail__Item}>
                <span className={styles.detail__Title}>Contact email</span>
                <span className={styles.detail__Info}>{place.email}</span>
            </p>
        </section>
    )
}

export default AdminPlaceCardDetails