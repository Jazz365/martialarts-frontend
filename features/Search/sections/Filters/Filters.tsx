'use client';


import FilterItem from '@/features/Search/components/FilterItem/FilterItem'
import React from 'react'
import styles from './styles.module.css'
import { dummyMartialStyles } from '@/utils/styles'
import { availablePlaceTypes } from '@/utils/placeTypes';
import { availableClassTypes } from '@/utils/classTypes';
import { availableLocations } from '@/utils/locations';
import { useSearchFilterContext } from '@/contexts/SearchFIlterContext';

const SearchFilters = () => {
    const { activeFilters } = useSearchFilterContext();

    return <>
        <section className={styles.filters__Wrap}>
            <FilterItem 
                title='style'
                filterKey='style'
                filters={dummyMartialStyles.map(style => style.name)}
                currentActiveFiltersForItem={activeFilters.style}
            />

            <FilterItem 
                title='place'
                filterKey='place'
                filters={availablePlaceTypes}
                currentActiveFiltersForItem={activeFilters.place}
            />
            
            <FilterItem 
                title='class type'
                filterKey='class'
                filters={availableClassTypes}
                currentActiveFiltersForItem={activeFilters.class}
            />

            <FilterItem 
                title='location'
                filterKey='location'
                filters={availableLocations}
                currentActiveFiltersForItem={activeFilters.location}
            />
        </section>
    </>
}

export default SearchFilters