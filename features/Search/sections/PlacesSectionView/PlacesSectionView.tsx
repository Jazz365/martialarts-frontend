import React from 'react'
import { allDummyPlaces, listingViewTypes } from '../Places/utils'
import PlaceListCard from '../../components/PlaceListCard/PlaceListCard'
import styles from './styles.module.css';
import { useSearchFilterContext } from '@/contexts/SearchFIlterContext';

const PlacesSectionView = () => {
    const {
        activeFilters
    } = useSearchFilterContext();

    return <>
        <section 
            className={`
                ${styles.list__Wrap}
                ${
                    (
                        activeFilters.view.length < 1 ||
                        activeFilters.view === listingViewTypes.listView
                    ) ?
                    ''
                    :
                    styles.wrap__Row
                }
            `}
        >
            {
                React.Children.toArray(allDummyPlaces.map(place => {
                    return <PlaceListCard 
                        place={place}
                        key={place.id}
                        isListView={
                            (
                                activeFilters.view.length < 1 ||
                                activeFilters.view === listingViewTypes.listView
                            )
                        }
                    />
                }))
            }
        </section>
    </>
}

export default PlacesSectionView;