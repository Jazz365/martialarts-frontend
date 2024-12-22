'use client';


import React from 'react'
import { listingSortOptions, listingViewTypes } from '../Places/utils'
import PlaceListCard from '../../components/PlaceListCard/PlaceListCard'
import styles from './styles.module.css';
import { useSearchFilterContext } from '@/contexts/SearchFIlterContext';
import PageLoader from '@/components/PageLoader/PageLoader';
import { useAppContext } from '@/contexts/AppContext';
import useMobile from '@/hooks/useMobile';

const PlacesSectionView = () => {
    const {
        activeFilters,
        allPlaces,
        placesLoading,
    } = useSearchFilterContext();

    const {
        showMap
    } = useAppContext();

    const isMobile = useMobile();
    
    if (placesLoading) return <PageLoader />
    
    return <>
        <section 
            className={`
                ${styles.list__Wrap}
                ${
                    (
                        activeFilters.view.length < 1 ||
                        activeFilters.view === listingViewTypes.listView
                    ) && showMap === true ?
                    ''
                    :
                    styles.wrap__Row
                }
            `}
        >
            {
                React.Children.toArray(
                    allPlaces
                    // .sort((a, b) => {
                    //     if (activeFilters.sort === listingSortOptions.sort_by_rating) return b.average_rating - a.average_rating
                    //     if (activeFilters.sort === listingSortOptions.sort_by_price) return b.pricing - a.pricing
                        
                    //     return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                    // })
                    .map((place, index) => {
                        return <PlaceListCard 
                            place={place}
                            index={index}
                            key={place.id}
                            isListView={
                                (
                                    activeFilters.view.length < 1 ||
                                    activeFilters.view === listingViewTypes.listView
                                )
                            }
                        />
                    })
                )
            }
        </section>
    </>
}

export default PlacesSectionView;