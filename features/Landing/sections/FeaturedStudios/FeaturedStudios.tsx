'use client';

import React, { useState } from 'react'
import styles from './styles.module.css'
import { dummyFeaturedPlaces } from './utils'
import FeatureCard from '../../components/FeatureCard/FeatureCard'
import Pagination from 'rc-pagination'
import FadeInOnScroll from '@/components/FadeInOnScroll/FadeInOnScroll';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';


const maxItemsPerPage = 4;

const FeaturedStudios = () => {
    const [ currentPage, setCurrentPage ] = useState<number>(1);

    return <>
        <section className={styles.content__Wrap}>
            <FadeInOnScroll>
                <section className={styles.header__Row}>
                    <h2 className={styles.header}>Featured Studios</h2>

                    {/* <Pagination 
                        current={currentPage}
                        total={dummyFeaturedPlaces.length}
                        defaultPageSize={maxItemsPerPage}
                        onChange={(page: number, pageSize: number) => setCurrentPage(page)}
                        locale={{
                            prev_page: 'Previous page',
                            next_page: 'Next page'
                        }}
                        showLessItems
                    /> */}
                </section>
            </FadeInOnScroll>
            
            <FadeInOnScroll>
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

            <section className={styles.custom__Pagination__Wrap}>
                <IoChevronBack
                    size={
                        currentPage <=1 ?
                            '0.8rem'
                        :
                        '1.2rem'
                    }
                    cursor={
                        currentPage <=1 ?
                            'default'
                        :
                        'pointer'
                    }
                    color={
                        currentPage <=1 ?
                            '#808080'
                        :
                        '#000'
                    }
                    onClick={
                        currentPage <= 1 ?
                            () => {}
                        :
                        () => setCurrentPage(currentPage - 1)   
                    }
                />
                
                <section className={styles.pagination__Content}>
                    <p className={styles.pagination__Detail}>
                        <span className={styles.current__Page}>{currentPage}</span>
                        <span>/</span>
                        <span>{Math.round(dummyFeaturedPlaces.length / maxItemsPerPage)}</span>
                    </p>

                    <section className={styles.progress__Bar}>
                        <section
                            className={styles.progress}
                            style={{
                                width: `${Number(currentPage / Math.round(dummyFeaturedPlaces.length / maxItemsPerPage)) * 100}%`
                            }}
                        ></section>
                    </section>
                </section>

                <IoChevronForward
                    size={
                        currentPage < Math.round(dummyFeaturedPlaces.length / maxItemsPerPage) ?
                            '1.2rem'
                        :
                        '0.8rem'
                    }
                    cursor={
                        currentPage < Math.round(dummyFeaturedPlaces.length / maxItemsPerPage) ?
                            'pointer'
                        :
                        'default'
                    }
                    color={
                        currentPage < Math.round(dummyFeaturedPlaces.length / maxItemsPerPage) ?
                            '#000'
                        :
                        '#808080'
                    }
                    onClick={
                        currentPage < Math.round(dummyFeaturedPlaces.length / maxItemsPerPage) ?
                            () => setCurrentPage(currentPage + 1)
                        :
                        () => {}
                    }
                />
            </section>
        </section>
    </>
}

export default FeaturedStudios