'use client';

import PaginationItem from '@/components/PaginationItem/PaginationItem';
import React, { useState } from 'react'
import styles from './styles.module.css'
import PlaceListCard from '@/features/Search/components/PlaceListCard/PlaceListCard';
import { useAppContext } from '@/contexts/AppContext';
import PageLoader from '@/components/PageLoader/PageLoader';
import Image from 'next/image';
import mascot from '../../../../assets/astr.webp'

const AllPlacesDetails = () => {
    const {
        userPlaces,
        userPlacesLoading,
    } = useAppContext();
    
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    
    if (userPlacesLoading) return <>
        <PageLoader />
    </>

    if (userPlaces.length < 1) return <section className={styles.empty__places}>
        <Image
            src={mascot}
            alt='mascot img'
            width={400}
            height={400}
            style={{
                objectFit: 'cover'
            }}
        />
        <p>You have not added any studios yet</p>
    </section>
    
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
                            imageHeight={350}
                            isInAppStudioUse={true}
                        />
                    }))
            }
        </section>
    </>
}

export default AllPlacesDetails