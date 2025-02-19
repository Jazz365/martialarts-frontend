'use client';

import React, { useMemo, useRef, useState } from 'react'
import styles from './styles.module.css'
import { dummyFeaturedPlaces } from './utils'
import FeatureCard from '../../components/FeatureCard/FeatureCard'
import FadeInOnScroll from '@/components/wrapperComponents/FadeInOnScroll/FadeInOnScroll';
// import PaginationItem from '@/components/PaginationItem/PaginationItem';
import useMobile from '@/hooks/useMobile';
import { useAppContext } from '@/contexts/AppContext/AppContext';
// import Link from 'next/link';
// import { listingSortOptions, listingViewTypes } from '@/features/Search/sections/Places/utils';
import Button from '@/components/buttons/Button/Button';
// import useClickOutside from '@/hooks/useClickOutside';


const maxItemsPerPage = 4;

const FeaturedStudios = () => {
    // const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ currentSelectedStyle, setCurrentSelectedStyle ] = useState<number | null>(null);
    const { allStyles } = useAppContext();
    const isMobile = useMobile();

    const stylesRef = useRef<HTMLDivElement>(null);
    const currentPlacesRef = useRef<HTMLDivElement>(null);

    const featuredStyles = useMemo<IMartialArtStyle[]>(() => {
        if (!allStyles || !Array.isArray(allStyles)) return [];

        const featuredStyles = allStyles.filter(style => style.is_featured == true);
        
        setCurrentSelectedStyle(featuredStyles[0]?.id ?? null);

        return featuredStyles;
    }, [allStyles])

    // useClickOutside({
    //     elemRef: stylesRef,
    //     alternateElementRef: currentPlacesRef,
    //     handleClickOutside: () => setCurrentSelectedStyle(null),
    // });
    
    return <>
        <section className={styles.content__Wrap}>
            <FadeInOnScroll>
                <section className={styles.header__Row}>
                    <h2 className={styles.header}>Featured Studios</h2>

                    <section className={styles.header__Row__Actions}>
                        <section 
                            className={styles.header__Styles}
                            ref={stylesRef}
                        >
                            {
                                React.Children.toArray(
                                    featuredStyles
                                    .map(style => {
                                        return <Button
                                            label={`${style.name} classes`}
                                            className={`${styles.style__item} ${currentSelectedStyle === style.id ? styles.active : ''}`}
                                            handleClick={() => setCurrentSelectedStyle(style.id)}
                                        />
                                    })
                                )
                            }
                        </section>

                        {/* <PaginationItem
                            currentPage={currentPage}
                            updateCurrentPage={setCurrentPage}
                            totalItems={dummyFeaturedPlaces.length}
                            itemsPerPage={maxItemsPerPage}
                        /> */}
                    </section>
                </section>
            </FadeInOnScroll>
            
            <FadeInOnScroll viewThreshold={isMobile ? 0.15 : 0.55}>
                <section className={styles.items__Wrap} ref={currentPlacesRef}>
                    {
                        React.Children.toArray(
                            dummyFeaturedPlaces
                            .filter(place => {
                                if (currentSelectedStyle) return place.place_styles.find(style => style.id === currentSelectedStyle);
                                return true;
                            })
                            // .slice(
                            //     currentPage < 2 ?
                            //         0
                            //     :
                            //         Number(currentPage * maxItemsPerPage) - Number(maxItemsPerPage)
                            //     ,
                            //     Number(currentPage * maxItemsPerPage)
                            // )
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

            {/* <p style={{ fontSize: '0.75rem', marginTop: '1rem' }}>This part is under construction</p> */}
        </section>
    </>
}

export default FeaturedStudios