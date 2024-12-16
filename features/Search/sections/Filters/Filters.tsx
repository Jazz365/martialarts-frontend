'use client';


import FilterItem from '@/features/Search/components/FilterItem/FilterItem'
import React from 'react'
import styles from './styles.module.css'
import { availableLocations } from '@/utils/locations';
import { useSearchFilterContext } from '@/contexts/SearchFIlterContext';
import { useAppContext } from '@/contexts/AppContext';

const SearchFilters = () => {
    const {
        placeTypes,
        catersTo,
        allStyles,
    } = useAppContext();
    const { activeFilters } = useSearchFilterContext();

    return <>
        <section className={styles.filters__Wrap}>
            <FilterItem 
                title='style'
                filterKey='style'
                filters={allStyles.map(style => style.name)}
                currentActiveFiltersForItem={activeFilters.style}
            />

            <FilterItem 
                title='place'
                filterKey='placeType'
                filters={placeTypes.map(place => place.name)}
                currentActiveFiltersForItem={activeFilters.placeType}
            />
            
            <FilterItem 
                title='class type'
                filterKey='class'
                filters={catersTo.map(type => type.name)}
                currentActiveFiltersForItem={activeFilters.class}
            />

            <FilterItem 
                title='location'
                filterKey='location'
                filters={Object.keys(availableLocations || {}).map(locationKey => {
                    return `${locationKey}, ${availableLocations[locationKey]}`
                })}
                currentActiveFiltersForItem={activeFilters.location}
            />
        </section>
    </>
}

export default SearchFilters