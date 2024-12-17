'use client';

import React, { useState } from 'react'
import styles from './styles.module.css'
import { dummyFeaturedPlaces } from './utils'
import FeatureCard from '../../components/FeatureCard/FeatureCard'
import FadeInOnScroll from '@/components/FadeInOnScroll/FadeInOnScroll';
import PaginationItem from '@/components/PaginationItem/PaginationItem';
import useMobile from '@/hooks/useMobile';


const maxItemsPerPage = 4;

const FeaturedStudios = () => {
    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const isMobile = useMobile();

    return <>
        <section className={styles.content__Wrap}>
            <FadeInOnScroll>
                <section className={styles.header__Row}>
                    <h2 className={styles.header}>Featured Studios</h2>

                    <PaginationItem
                        currentPage={currentPage}
                        updateCurrentPage={setCurrentPage}
                        totalItems={dummyFeaturedPlaces.length}
                        itemsPerPage={maxItemsPerPage}
                    />
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