'use client';


import React, { useEffect, useRef, useState } from 'react'
import { IoChevronDown } from 'react-icons/io5';
import styles from './styles.module.css';
import Button from '../../../../components/Button/Button';
import useClickOutside from '@/hooks/useClickOutside';
import { useSearchFilterContext } from '@/contexts/SearchFIlterContext';


const FilterItem = ({
    title='',
    filterKey='',
    filters=[],
    currentActiveFiltersForItem=[],
}: {
    title: string;
    filterKey: string;
    filters?: string[];
    currentActiveFiltersForItem?: string[];
}) => {
    const {
        handleUpdateFiltersForCategory,
    } = useSearchFilterContext();

    const [ selectedFilters, setSelectedFilters ] = useState<string[]>([]);
    const [ showFilterListing, setShowFilterListing ] = useState<boolean>(false);
    const filterWrapRef = useRef<HTMLDivElement>(null);
    const listingRef = useRef<HTMLDivElement>(null);
    
    useClickOutside({
        elemRef: filterWrapRef,
        alternateElementRef: listingRef,
        handleClickOutside: () => setShowFilterListing(false),
    });

    useEffect(() => {
        setSelectedFilters(currentActiveFiltersForItem);
    }, [currentActiveFiltersForItem])

    const handleBtnClick = (value: string[]) => {
        handleUpdateFiltersForCategory(filterKey, value);
        setShowFilterListing(false);
    } 

    return <>
        <section 
            className={`${styles.filter__Item} ${currentActiveFiltersForItem.length > 0 ? styles.has__Items : ''}`}
            onClick={() => setShowFilterListing(!showFilterListing)}
            ref={filterWrapRef}
        >
            <span>{currentActiveFiltersForItem.length > 0 ? currentActiveFiltersForItem.length + ' ' : ''}{title}{currentActiveFiltersForItem.length > 1 ? 's' : ''}</span>
            
            <IoChevronDown />

            {
                showFilterListing &&
                <section 
                    className={styles.filter__Listing__Wrap}
                    ref={listingRef}
                    onClick={(e) => e.stopPropagation()}
                >
                    <ul className={styles.filter__Listing}>
                        {
                            React.Children.toArray(filters.map(filter => {
                                return <li 
                                    className={styles.single__Filter}
                                    key={filter}
                                >
                                    <label className={styles.single__Filter__Label}>
                                        <input 
                                            type='checkbox'
                                            checked={selectedFilters.includes(filter)}
                                            onChange={({ target }) => {
                                                if (target.checked === false) return setSelectedFilters((prevFilters) => prevFilters.filter(selectFilter => filter !== selectFilter));

                                                setSelectedFilters((prevFilters) => [...prevFilters, filter])
                                            }}
                                        />
                                        <span>{filter}</span>
                                    </label>
                                </li>
                            }))
                        }
                    </ul>

                    <section className={styles.actions__Wrap}>
                        <Button 
                            label='Clear'
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'transparent',
                                color: '#000',
                                border: '1px solid #000',
                                padding: '0.65rem 1.5rem'
                            }}
                            handleClick={() => handleBtnClick([])}
                        />

                        <Button
                            label='Save'
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid #000',
                                padding: '0.65rem 1.5rem'
                            }}
                            handleClick={() => handleBtnClick(selectedFilters)}
                        />
                    </section>
                </section>
            }
        </section>
    </>
}

export default FilterItem