'use client';


import Button from '@/components/buttons/Button/Button'
import React, { useState } from 'react'
import { IoStarOutline } from 'react-icons/io5'
import styles from './styles.module.css'
// import SearchBar from '@/components/SearchBar/SearchBar'
import { useSearchFilterContext } from '@/contexts/SearchFilterContext/SearchFIlterContext'
import { listingSortOptions, listingViewTypesList } from './utils';
import PlacesSectionView from '../PlacesSectionView/PlacesSectionView';
// import ResultsViewOption from '../../components/ResultsViewOption/ResultsViewOption';
import useMobile from '@/hooks/useMobile';
import { toast } from 'sonner';
import SingleResultViewOption from '../../components/ResultsViewOption/SingleResultViewOption';
import { useAppContext } from '@/contexts/AppContext/AppContext';
import { makeGetRequest } from '@/services/functions';


const SearchPlacesListing = () => {
  const {
    activeFilters,
    handleUpdateFiltersForCategory,
    allPlaces,
    placesLoaded,
    moreResultsLink,
    setMoreResultsLink,
    totalResults,
    setAllPlaces,
  } = useSearchFilterContext();

  const {
    showMap
  } = useAppContext();

  const isMobile = useMobile();
  const [ searchVal, setSearchVal ] = useState<string>('');
  const [ moreResultsLoading, setMoreResultsLoading ] = useState(false);

  const handleLoadMore = async () => {
    if (!moreResultsLink || moreResultsLoading) return;

    setMoreResultsLoading(true);

    try {
      const res = await makeGetRequest(moreResultsLink);

      const newResults = Array.isArray(res.results) ? res.results : [];
      const nextResultLink: string = res.next ?? null;
      
      setMoreResultsLoading(false);
      setAllPlaces([
        ...allPlaces,
        ...newResults,
      ]);

      setMoreResultsLink(nextResultLink);
    } catch (error) {
      setMoreResultsLoading(false);
    }
  }

  return <>
    <section className={`${styles.listing__Wrap} ${showMap === false ? styles.full : ''}`}>
      <section className={styles.listing__Title}>
        <h1 className={styles.header}>
          <span>{placesLoaded ? totalResults : 0} results</span>
          {/* <span className={styles.subheader}>Find your perfect martial arts style place</span> */}
        </h1>

        <section className={styles.header__Actions}>
          <SingleResultViewOption 
            children={
              React.Children.toArray(listingViewTypesList.map(type => {
                return <Button 
                  label={isMobile ? '' : type.viewType}
                  style={{
                    // border: activeFilters.view === type.viewType ? 
                    //   '1px solid #000'
                    // :
                    // '',
                    fontSize: '0.75rem',
                    padding: '0.55rem 1rem',
                    color: activeFilters.view === type.viewType ? 
                      '#000'
                    :
                    '#808080',
                    backgroundColor: activeFilters.view === type.viewType ? 
                      '#fff'
                    :
                    'transparent',
                    transition: '0.25s ease-in-out',
                    boxShadow: activeFilters.view === type.viewType ?
                      'var(--card-box-shadow)'
                    :
                    '',
                  }}
                  handleClick={
                    () => handleUpdateFiltersForCategory('view', type.viewType)
                  }
                  key={type.viewType}
                  icon={<type.icon />}
                />
              }))
            }
          />

          <Button 
            label={isMobile ? 'Save' : 'Save search'}
            icon={<IoStarOutline />}
            style={{
              border: '1px solid #d3d3d3',
              backgroundColor: '#fff',
              color: '#000',
              fontSize: '0.75rem',
              padding: '0.5rem 1rem',
              boxShadow: 'var(--card-box-shadow)',
            }}
            handleClick={() => toast.success('Feature coming soon!')}
          />
        </section>
      </section>

      {/* <section className={styles.listing__Search}>
        <SearchBar
          placeholder='Search by name'
          style={{
            padding: '0.75rem 1rem',
            fontSize: '0.75rem',
          }}
          name='name'
          value={searchVal}
          onChange={(_name, value) => setSearchVal(value)}
        />

        <section className={styles.search__Actions}>
          <Button 
            label='clear'
            style={{
              border: '1px solid #000',
              backgroundColor: 'transparent',
              color: '#000',
              fontSize: '0.75rem',
              padding: '0.5rem 1rem'
            }}
            handleClick={() => handleUpdateFiltersForCategory('name', [])}
          />

          <Button 
            label='search'
            style={{
              border: '1px solid #000',
              fontSize: '0.75rem',
              padding: '0.55rem 1rem'
            }}
            handleClick={() => handleUpdateFiltersForCategory('name', [searchVal])}
          />
        </section>
      </section> */}
      
      {/* <ResultsViewOption 
        options={[
          {
            id: 1,
            children: React.Children.toArray(Object.keys(listingSortOptions).map(sortOptionKey => {
              return <Button 
                label={isMobile ? listingSortOptions[sortOptionKey] : sortOptionKey.replaceAll('_', ' ')}
                style={{
                  border: activeFilters.sort === listingSortOptions[sortOptionKey] ? 
                    '1px solid #000'
                  :
                  '',
                  fontSize: '0.75rem',
                  padding: '0.55rem 1rem',
                  color: activeFilters.sort === listingSortOptions[sortOptionKey] ? 
                    '#000'
                  :
                  '#808080',
                  backgroundColor: activeFilters.sort === listingSortOptions[sortOptionKey] ? 
                    '#fff'
                  :
                  'transparent',
                  transition: '0.25s ease-in-out',
                }}
                handleClick={
                  () => handleUpdateFiltersForCategory('sort', listingSortOptions[sortOptionKey])
                }
                key={sortOptionKey}
              />
            }))
          },
          {
            id: 2,
            children: React.Children.toArray(listingViewTypesList.map(type => {
              return <Button 
                label={isMobile ? '' : type.viewType}
                style={{
                  border: activeFilters.view === type.viewType ? 
                    '1px solid #000'
                  :
                  '',
                  fontSize: '0.75rem',
                  padding: '0.55rem 1rem',
                  color: activeFilters.view === type.viewType ? 
                    '#000'
                  :
                  '#808080',
                  backgroundColor: activeFilters.view === type.viewType ? 
                    '#fff'
                  :
                  'transparent',
                  transition: '0.25s ease-in-out',
                }}
                handleClick={
                  () => handleUpdateFiltersForCategory('view', type.viewType)
                }
                key={type.viewType}
                icon={<type.icon />}
              />
            }))
          }
        ]}
      /> */}

      <PlacesSectionView />

      {
        moreResultsLink && placesLoaded &&
        <Button 
          label={
            moreResultsLoading ?
              'loading...'
            :
            'load more'
          }
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 'max-content',
            margin: '0 auto',
            backgroundColor: 'transparent',
            border: '1px solid black',
            color: 'black',
          }}
          handleClick={() => handleLoadMore()}
        />
      }
    </section>
  </>
}

export default SearchPlacesListing