import Image, { StaticImageData } from 'next/image';
import React, { memo } from 'react'
import styles from './styles.module.css'
// import Link from 'next/link';
import Button from '@/components/Button/Button';
import MemoizedImage from '@/components/MemoizedImage/MemoizedImage';
import { toast } from 'sonner';

const defaultPlaceId = 2;

const FeatureCard = memo(({
    featuredPlace,
}: {
    featuredPlace: {
        id: number;
        name: string;
        location: {
            address: string;
            city: string;
            state: string;
        };
        image: StaticImageData;
        average_rating: number;
        activity_hours: {
            opening_time: string;
            closing_time: string;
            days: string;
        },
        free_lesson_available: boolean;
        is_featured: boolean;
        price: number;
        place_styles: IMartialArtStyle[];
        place_caters_to: ICatersTo[];
    }
}) => {
    return <>
        <section 
            className={styles.card__Item}
            // href={''}
            // href={`/places/${defaultPlaceId}`}
        >
            <MemoizedImage 
                src={featuredPlace.image}
                alt={featuredPlace.name}
                className={styles.card__Image}
                // priority
            />

            <section className={styles.card__Content}>
                <h3 className={styles.header}>{featuredPlace.name}</h3>

                <p 
                    className={styles.content__Detail}
                >
                    <span><b className={styles.title}>Location:</b> {featuredPlace?.location?.address} {featuredPlace?.location?.city} {featuredPlace?.location?.state}</span>
                </p>

                <p 
                    className={styles.content__Detail}
                >
                    <span><b className={styles.title}>styles offered:</b> {featuredPlace.place_styles.map(item => item.name).join(', ')}</span>
                </p>

                <p 
                    className={styles.content__Detail}
                >
                    <span><b className={styles.title}>skills offered:</b> {featuredPlace.place_caters_to.map(item => item.name).join(', ')}</span>
                </p>

                <p 
                    className={styles.content__Detail}
                >
                    <span><b className={styles.title}>class times: </b>{featuredPlace?.activity_hours?.opening_time} - {featuredPlace?.activity_hours?.closing_time}</span>
                </p>

                {/* <br /> */}

                <section className={styles.bottom__Row}>
                    <p className={styles.content__Detail}>
                        <span className={styles.price__Intro}>From</span>
                        {/* <IoPricetagsOutline size={'1.2rem'} /> */}
                        <span className={styles.price}>${featuredPlace?.price}/month</span>
                    </p>

                    <Button 
                        label='join class'
                        style={{
                            fontSize: '0.8rem',
                            padding: '0.75rem 1.4rem',
                            backgroundColor: 'var(--red-color)',
                        }}
                        hoverStyle={{
                            backgroundColor: 'black',
                        }}
                        handleClick={() => toast.info("This part is still under construction")}
                    />
                </section>
            </section>
        </section>
    </>
})

export default FeatureCard