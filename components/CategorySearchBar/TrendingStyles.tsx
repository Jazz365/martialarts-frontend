import { useAppContext } from '@/contexts/AppContext/AppContext';
import React, { memo, useMemo } from 'react'
import AlternatingDotsLoader from '../loaders/AlternatingDotsLoader/AlternatingDotsLoader';
import styles from './styles.module.css'
import Link from 'next/link';
import { listingSortOptions, listingViewTypes } from '@/features/Search/sections/Places/utils';


const TrendingStyles = memo(({
    hideTrendingStyles=false,
}: {
    hideTrendingStyles?: boolean;
}) => {
    const {
        allStyles,
        stylesLoading,  
    } = useAppContext();

    const trendingStyles = useMemo<IMartialArtStyle[]>(() => {
        if (!allStyles || !Array.isArray(allStyles)) return [];

        return allStyles.filter(style => style.is_trending === true);
    }, [allStyles])

    if (hideTrendingStyles === true) return <></>

    return <section className={styles.trending__Wrap}>
        {
            stylesLoading ?
                <AlternatingDotsLoader />
            :
            trendingStyles.length < 1 ?
                <></>
            :
            <>
                <p>Trending styles</p>

                <section className={styles.trending__Items}>
                    {
                        React.Children.toArray(
                            trendingStyles
                            .map(style => {
                                return <Link
                                    href={`/search?style_id=${encodeURIComponent(style.id)}&view=${listingViewTypes.listView}&sort=${listingSortOptions.sort_by_newest}`}
                                    className={styles.trending__Item}
                                    key={style.id}
                                >
                                    {style.name}
                                </Link>
                            })
                        )
                    }
                </section>
            </>
        }
    </section>
})


TrendingStyles.displayName = 'TrendingStyles';

export default TrendingStyles