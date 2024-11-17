'use client';

import React, { useState } from 'react'
import styles from './styles.module.css'
import { dummyFeaturedPlaces } from './utils'
import FeatureCard from '../../components/FeatureCard/FeatureCard'
import Pagination from 'rc-pagination'


const maxItemsPerPage = 4;

const FeaturedItems = () => {
    const [ currentPage, setCurrentPage ] = useState<number>(1);

    return <>
        <section className={styles.content__Wrap}>
            <section className={styles.header__Row}>
                <h2 className={styles.header}>Featured Places</h2>

                <Pagination 
                    current={currentPage}
                    total={dummyFeaturedPlaces.length}
                    defaultPageSize={maxItemsPerPage}
                    onChange={(page: number, pageSize: number) => setCurrentPage(page)}
                    locale={{
                        prev_page: 'Previous page',
                        next_page: 'Next page'
                    }}
                />
            </section>

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
        </section>
    </>
}

export default FeaturedItems