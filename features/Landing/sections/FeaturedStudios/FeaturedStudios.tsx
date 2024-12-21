'use client';

import React, { useState } from 'react'
import styles from './styles.module.css'
import { dummyFeaturedPlaces } from './utils'
import FeatureCard from '../../components/FeatureCard/FeatureCard'
import FadeInOnScroll from '@/components/FadeInOnScroll/FadeInOnScroll';
import PaginationItem from '@/components/PaginationItem/PaginationItem';
import useMobile from '@/hooks/useMobile';
import { useAppContext } from '@/contexts/AppContext';
import Link from 'next/link';
import { listingSortOptions, listingViewTypes } from '@/features/Search/sections/Places/utils';


const maxItemsPerPage = 4;

const FeaturedStudios = () => {
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const { allStyles } = useAppContext();
    const isMobile = useMobile();

    return <>
        <section className={styles.content__Wrap}>
            <FadeInOnScroll>
                <section className={styles.header__Row}>
                    <h2 className={styles.header}>Featured Studios</h2>

                    <section className={styles.header__Row__Actions}>
                        <section className={styles.header__Styles}>
                            {
                                React.Children.toArray(
                                    allStyles.slice(0, 3)
                                    .map(style => {
                                        return <Link
                                            className={styles.style__item}
                                            href={`/search?style=${encodeURIComponent(style.name)}&view=${listingViewTypes.listView}&sort=${listingSortOptions.sort_by_newest}`}
                                        >
                                            {style.name}{' '}classes
                                        </Link>
                                    })
                                )
                            }
                        </section>

                        <PaginationItem
                            currentPage={currentPage}
                            updateCurrentPage={setCurrentPage}
                            totalItems={dummyFeaturedPlaces.length}
                            itemsPerPage={maxItemsPerPage}
                        />
                    </section>
                </section>
            </FadeInOnScroll>
            
            <FadeInOnScroll viewThreshold={isMobile ? 0.15 : 0.55}>
                <section className={styles.items__Wrap}>
                    {
                        React.Children.toArray(
                            dummyFeaturedPlaces
                            .slice(
                                currentPage < 2 ?
                                    0
                                :
                                    Number(currentPage * maxItemsPerPage) - Number(maxItemsPerPage)
                                ,
                                Number(currentPage * maxItemsPerPage)
                            )
                            .map(place => {
                                return <FeatureCard 
                                    featuredPlace={place}
                                    key={place.id}
                                />
                            }
                        ))
                    }
                </section>
            </FadeInOnScroll>
        </section>
    </>
}

export default FeaturedStudios