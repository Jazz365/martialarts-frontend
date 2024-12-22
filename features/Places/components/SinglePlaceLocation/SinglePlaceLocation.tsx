'use client';

import React from 'react'
import styles from './styles.module.css'
import PlacesMap from '@/features/Search/sections/Map/Map'
import useMobile from '@/hooks/useMobile';


const SinglePlaceLocation = () => {
    const isMobile = useMobile();

    return (
        <section className={styles.content__Wrap}>
            <h3 className={styles.header}>location</h3>
            
            <PlacesMap 
                minHeight={isMobile ? '14rem' : '24rem'}
                width='100%'
                showContentOnSmallScreen={true}
            />
        </section>
    )
}

export default SinglePlaceLocation