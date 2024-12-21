'use client';

import React, { CSSProperties, useState } from 'react'
import { IoClose, IoSearch } from 'react-icons/io5'
import styles from './styles.module.css'
import Link from 'next/link'
import { dummyMartialStyles } from '@/utils/styles';
import { listingSortOptions, listingViewTypes } from '@/features/Search/sections/Places/utils';
import { useAppContext } from '@/contexts/AppContext';
import Loader from '../Loader/Loader';


const CategorySearchBar = ({
    hideTrendingStyles=false,
    wrapperStyle={},
    searchBarStyle={},
}: {
    hideTrendingStyles?: boolean;
    wrapperStyle?: CSSProperties;
    searchBarStyle?: CSSProperties;
}) => {
    const [ searchValue, setSearchValue ] = useState<string>('');
    const [ inputFocused, setInputFocused ] = useState<boolean>(false);
    const {
        allStyles,
        stylesLoading,  
    } = useAppContext();

    return <>
        <section className={styles.search__Bar__Wrap} style={wrapperStyle}>
            <section className={styles.search__Bar} style={searchBarStyle}>
                <input 
                    placeholder='Choose the style you want to learn'
                    value={searchValue}
                    onChange={({ target }) => setSearchValue(target.value)}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                />

                <div className={styles.search__ICon__Wrap}>
                    {
                        inputFocused ?
                            <IoClose 
                                size={'1.4rem'}
                                color='#fff'
                                cursor={'pointer'}
                            />
                        :
                        <IoSearch
                            size={'1.4rem'}
                            color='#fff'
                            cursor={'pointer'}
                        />
                    }
                </div>

                <section className={styles.category__Listing__Wrap}>
                    <p>Martial Arts Styles</p>

                    {
                        stylesLoading ?
                            <section style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <Loader />
                            </section>
                        :
                        <ul 
                            className={styles.category__Listing}
                            onMouseDown={(event: React.MouseEvent<HTMLUListElement, MouseEvent>) => event.preventDefault()}
                        >
                            {
                                React.Children.toArray(
                                    allStyles
                                    .filter(styleItem => styleItem.is_search_style === true)
                                    .filter(styleItem => {
                                        if (searchValue.length > 0) return styleItem.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());

                                        return true;
                                    })
                                    .map(styleItem => {
                                        return <li
                                            key={styleItem.id}
                                        >
                                            <Link
                                                href={`/search?style=${encodeURIComponent(styleItem.name)}&view=${listingViewTypes.listView}&sort=${listingSortOptions.sort_by_newest}`}
                                            >
                                                {styleItem.name}
                                            </Link>
                                        </li>
                                    })
                                )
                            }
                        </ul>
                    }
                </section>
            </section>

            {
                hideTrendingStyles ? <></>
                    :
                <section className={styles.trending__Wrap}>
                    <p>Trending styles</p>

                    <section className={styles.trending__Items}>
                        {
                            React.Children.toArray(
                                allStyles
                                .filter(style => style.is_trending === true)
                                .map(style => {
                                    return <Link
                                        href={`/search?style=${encodeURIComponent(style.name)}&view=${listingViewTypes.listView}&${listingSortOptions.sort_by_newest}`}
                                        className={styles.trending__Item}
                                        key={style.id}
                                    >
                                        {style.name}
                                    </Link>
                                })
                            )
                        }
                    </section>
                </section>
            }
        </section>
    </>
}

export default CategorySearchBar;