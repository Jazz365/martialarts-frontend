'use client';

import PaginationItem from '@/components/PaginationItem/PaginationItem';
import React from 'react'
import styles from './styles.module.css'
import { allDummyPlaces } from '@/features/Search/sections/Places/utils';
import PlaceListCard from '@/features/Search/components/PlaceListCard/PlaceListCard';


const AllPlacesDetails = () => {
    return <>
        <PaginationItem 
            currentPage={1}
            itemsPerPage={5}
            totalItems={5}
        />

        <section className={styles.all__places}>
            {
                React.Children.toArray(allDummyPlaces.map(place => {
                    return <PlaceListCard
                        place={place}
                        key={place.id}
                        isOwnerView
                    />
                }))
            }
        </section>
    </>
}

export default AllPlacesDetails