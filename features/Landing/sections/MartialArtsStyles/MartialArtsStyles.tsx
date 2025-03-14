'use client';

import React, { useMemo } from 'react'
import styles from './styles.module.css'
import { dummyMartialStyles } from '@/utils/styles'
import Link from 'next/link'
import FadeInOnScroll from '@/components/wrapperComponents/FadeInOnScroll/FadeInOnScroll'
import { listingSortOptions, listingViewTypes } from '@/features/Search/sections/Places/utils'
import Button from '@/components/buttons/Button/Button'
import { useAppContext } from '@/contexts/AppContext/AppContext'
import { cleanStringAndReturnLower } from '@/helpers/formatters';
import MemoizedImage from '@/components/common/MemoizedImage/MemoizedImage';


const MartialArtsStyles = () => {
    const {
        allStyles,
        stylesLoading,
    } = useAppContext();
    
    const stylesToShow = useMemo(() => {
        const featuredStyles = dummyMartialStyles.filter(style => style.isFeatured === true);
        if (stylesLoading || allStyles.length < 1 || !allStyles) return featuredStyles;

        return featuredStyles.map(style => {
            const foundStyle = allStyles.find(
                styleItem => cleanStringAndReturnLower(styleItem.name) === cleanStringAndReturnLower(style.name)
            );

            if (foundStyle) return {
                ...style,
                original_id: foundStyle.id
            }

            return style
        });
    }, [allStyles, stylesLoading]);
    
    return <>
        <section className={styles.content__Wrap}>
            <FadeInOnScroll>
                <h2 className={styles.header}>What martial art do you want to learn?</h2>
            </FadeInOnScroll>
            
            <section className={styles.styles__Wrap}>
                {
                    stylesToShow
                    .map(style => {
                        return <>
                            <FadeInOnScroll 
                                key={style.id}
                                viewThreshold={0.5}
                                className={styles.style__Item__Detail}
                            >
                                <Link
                                    href={
                                        style.original_id ?
                                            `/search?style_id=${encodeURIComponent(style.original_id)}&view=${listingViewTypes.listView}&sort=${listingSortOptions.sort_by_newest}`
                                        :
                                        ''
                                    }
                                >
                                    <MemoizedImage 
                                        src={style.imageUrl}
                                        alt={style.name}
                                        className={styles.style__Image}
                                        // priority
                                    />

                                    <section className={styles.mask}>
                                        <h3 className={styles.style__Name}>{style.name}</h3>
                                    </section>
                                </Link>
                            </FadeInOnScroll>
                        </>
                    })
                }
            </section>

            <Button 
                label='more categories'
                style={{
                    width: 'max-content',
                    background: 'transparent',
                    color: '#000',
                    border: '1px solid #000',
                }}
                useLink
                linkLocation='/search'
                hoverStyle={{
                    background: '#000',
                    color: '#fff'
                }}
            />
        </section>
    </>
}

export default MartialArtsStyles