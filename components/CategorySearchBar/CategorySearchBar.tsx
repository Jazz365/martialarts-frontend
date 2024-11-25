'use client';

import React, { useState } from 'react'
import { IoClose, IoSearch } from 'react-icons/io5'
import styles from './styles.module.css'
import Link from 'next/link'
import { dummyMartialStyles } from '@/utils/utils';


const CategorySearchBar = () => {
    const [ searchValue, setSearchValue ] = useState<string>('');
    const [ inputFocused, setInputFocused ] = useState<boolean>(false);

    return <>
        <section className={styles.search__Bar__Wrap}>
            <section className={styles.search__Bar}>
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

                    <ul 
                        className={styles.category__Listing}
                        onMouseDown={(event: React.MouseEvent<HTMLUListElement, MouseEvent>) => event.preventDefault()}
                    >
                        {
                            React.Children.toArray(
                                dummyMartialStyles
                                .filter(styleItem => {
                                    if (searchValue.length > 0) return styleItem.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase());

                                    return true;
                                })
                                .map(styleItem => {
                                    return <li
                                        key={styleItem.id}
                                    >
                                        <Link
                                            href={`/search?category=${styleItem.name}`}
                                        >
                                            {styleItem.name}
                                        </Link>
                                    </li>
                                })
                            )
                        }
                    </ul>
                </section>
            </section>

            <section className={styles.trending__Wrap}>
                <p>Trending styles</p>

                <section className={styles.trending__Items}>
                    {
                        React.Children.toArray(
                            dummyMartialStyles.map(style => {
                                return <Link
                                    href={`/search?category=${style.name}`}
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
        </section>
    </>
}

export default CategorySearchBar;