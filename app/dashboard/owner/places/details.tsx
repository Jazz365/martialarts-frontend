'use client';

import PaginationItem from '@/components/PaginationItem/PaginationItem';
import React, { useState } from 'react'
import styles from './styles.module.css'
import PlaceListCard from '@/features/Search/components/PlaceListCard/PlaceListCard';
import { useAppContext } from '@/contexts/AppContext';
import PageLoader from '@/components/PageLoader/PageLoader';


const AllPlacesDetails = () => {
    const {
        userPlaces,
        userPlacesLoading,
    } = useAppContext();
    
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    
    if (userPlacesLoading) return <>
        <PageLoader />
    </>
    
    return <>
        <PaginationItem 
            currentPage={currentPage}
            updateCurrentPage={setCurrentPage}
            itemsPerPage={6}
            totalItems={userPlaces.length}
        />

        <section className={styles.all__places}>
            {
                React.Children.toArray(
                    userPlaces
                    .slice(
                        currentPage < 2 ?
                            0
                        :
                            Number(currentPage * 5) - Number(5)
                        ,
                        Number(currentPage * 5)
                    )
                    .map((place, index) => {
                        return <PlaceListCard
                            place={place}
                            index={index}
                            key={place.id}
                            isListView={false}
                            style={{
                                height: '100%',
                                maxHeight: '33rem',
                            }}
                            imageHeight={350}
                        />
                    }))
            }
        </section>
    </>
}

export default AllPlacesDetails