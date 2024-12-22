import React from 'react'
import styles from './styles.module.css'
import PlacesMap from '@/features/Search/sections/Map/Map'


const SinglePlaceLocation = () => {
    return (
        <section className={styles.content__Wrap}>
            <h3 className={styles.header}>location</h3>
            
            <PlacesMap 
                minHeight='24rem'
                width='100%'
            />
        </section>
    )
}

export default SinglePlaceLocation