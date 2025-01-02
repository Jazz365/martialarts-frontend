'use client';


import React from 'react'
import PlacesMap from '@/features/Search/sections/Map/Map'
import SearchPlacesListing from '@/features/Search/sections/Places/Places'
import styles from './styles.module.css'
import { useSearchFilterContext } from '@/contexts/SearchFIlterContext';
// import { testMapCoordinates } from '@/features/Search/sections/Map/utils';

const SearchPageDetails = () => {
    const {
        allPlaces,
    } = useSearchFilterContext();
    
    return (
        <section className={styles.content__Wrap}>
            <SearchPlacesListing />
            <PlacesMap 
                placeCoordinates={
                    allPlaces.flatMap(place => place.place_locations.map(location => ({ 
                        lat: location.latitude, 
                        lng: location.longitude,
                        name: place.name,
                    })))
                }
            />
        </section>
    )
}

export default SearchPageDetails