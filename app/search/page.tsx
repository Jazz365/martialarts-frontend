import NavigationBar from '@/components/NavigationBar/NavigationBar'
import React from 'react'
import SearchFilters from '@/features/Search/sections/Filters/Filters'
import PlacesMap from '@/features/Search/sections/Map/Map'
import SearchPlacesListing from '@/features/Search/sections/Places/Places'
import styles from './styles.module.css'

const SearchPage = () => {
  return <>
    <NavigationBar
      showSearchBar={true}
      wrapperStyle={{
        padding: '1rem 1.5rem'
      }}
    />
    
    <SearchFilters />
    
    <section className={styles.content__Wrap}>
      <SearchPlacesListing />
      <PlacesMap />
    </section>
  </>
}

export default SearchPage