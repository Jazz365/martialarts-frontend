'use client';

import { useAppContext } from '@/contexts/AppContext/AppContext';
import FilterItem from '@/features/Search/components/FilterItem/FilterItem'
import React from 'react'
import styles from './styles.module.css'
import { useAdminDataContext } from '@/contexts/AdminDataContext/AdminDataContext';


const AdminPlaceFilters = () => {
    const {
        allStyles,
        placeTypes,
        catersTo,
        ageGroups,
    } = useAppContext();

    const {
        activePlaceFilters,
    } = useAdminDataContext();

    return <>
        <section className={`${styles.filters__Wrap}`}>
            <FilterItem
                title='style'
                filterKey='style_id'
                filters={
                    allStyles
                    .sort((a, b) => {
                        if (a.is_featured === true && b.is_featured !== true) return -1;
                        if (a.is_featured !== true && b.is_featured === true) return 1;
                        return 0;
                    })
                    .map(style => ({ 
                        name: `${style.name}`, 
                        value: String(style.id),
                    }))
                }
                currentActiveFiltersForItem={activePlaceFilters.style_id}
                useAdminContextFilterUpdate
            />

            <FilterItem
                title='place'
                filterKey='type_of_place_id'
                filters={placeTypes.map(place => ({ name: place.name, value: String(place.id) }))}
                currentActiveFiltersForItem={activePlaceFilters.type_of_place_id}
                useAdminContextFilterUpdate
            />
            
            <FilterItem 
                title='class type'
                filterKey='caters_to_id'
                filters={catersTo.map(type => ({ name: type.name, value: String(type.id) }))}
                currentActiveFiltersForItem={activePlaceFilters.caters_to_id}
                useAdminContextFilterUpdate
            />

            <FilterItem 
                title='age group'
                filterKey='age_group_id'
                filters={ageGroups.map(type => ({ name: type.name, value: String(type.id) }))}
                currentActiveFiltersForItem={activePlaceFilters.age_group_id}
                useAdminContextFilterUpdate
            />
        </section>
    </>
}

export default AdminPlaceFilters