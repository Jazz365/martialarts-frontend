'use client';

import React, { useState } from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import styles from './styles.module.css'
import Link from 'next/link'
import { dummyMartialStyles } from '@/utils/utils';


const CategorySearchBar = () => {
    const [ searchValue, setSearchValue ] = useState<string>('');

    return <>
        <section className={styles.search__Bar}>
            <input 
                placeholder='Search by martial arts category'
                value={searchValue}
                onChange={({ target }) => setSearchValue(target.value)}
            />

            <div className={styles.search__ICon__Wrap}>
                <IoSearchOutline 
                    size={'1.4rem'}
                    color='#fff'
                />
            </div>

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
    </>
}

export default CategorySearchBar;