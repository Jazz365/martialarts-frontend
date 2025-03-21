'use client'


import PaginationItem from '@/components/common/PaginationItem/PaginationItem';
import PageLoader from '@/components/loaders/PageLoader/PageLoader';
import { useAdminDataContext } from '@/contexts/AdminDataContext/AdminDataContext'
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import styles from './styles.module.css'
import mascot from '../../../../assets/astr.webp'
import { blurFocusFromCurrentPage } from '@/helpers/helpers';
import AdminPlaceFilters from '@/features/Dashboard/components/AdminPlaceFilters/AdminPlaceFilters';
import AdminPlaceCard from '@/features/Dashboard/components/AdminPlaceCard/AdminPlaceCard';


const itemsPerPage = 6;

const AllStudiosDetail = () => {
    const {
        placesToDisplay,
        placesLoading,
    } = useAdminDataContext();

    const searchParams = useSearchParams();
    const router = useRouter();

    const currentPage = !searchParams.get('page') || isNaN(Number(searchParams.get('page'))) ? 1 : Number(searchParams.get('page'));

    useEffect(() => {
        blurFocusFromCurrentPage();
    }, [searchParams])

    const handleRouteToNewPage = (page: number) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());

        newSearchParams.set('page', `${page}`);

        router.push(`?${newSearchParams.toString()}`);
    }

    if (placesLoading) return <>
        <PageLoader />
    </>
    
    return <>
        <PaginationItem
            currentPage={currentPage}
            updateCurrentPage={(page) => handleRouteToNewPage(page)}
            itemsPerPage={itemsPerPage}
            totalItems={placesToDisplay.length}
        />

        <section className={styles.title__Wrap}>
            <h1 className={`${styles.results}`}>{placesToDisplay.length} results</h1>
            <AdminPlaceFilters />
        </section>
        
        {
            placesToDisplay.length < 1 ? <>
                <section className={styles.empty__places}>
                    <Image
                        src={mascot}
                        alt='mascot img'
                        width={400}
                        height={400}
                        style={{
                            objectFit: 'cover'
                        }}
                    />
                    <p>No studios to display</p>
                </section>
            </>
            :
            <>
                <section className={styles.all__places}>
                    {
                        React.Children.toArray(
                            placesToDisplay
                            .slice(
                                currentPage < 2 ?
                                    0
                                :
                                    Number(currentPage * itemsPerPage) - Number(itemsPerPage)
                                ,
                                Number(currentPage * itemsPerPage)
                            )
                            .map((place) => {
                                return <AdminPlaceCard 
                                    place={place}
                                    key={place.id}
                                />
                            })
                        )
                    }
                </section>
            </>
        }
    </>
}

export default AllStudiosDetail