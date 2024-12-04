import Image, { StaticImageData } from 'next/image';
import React from 'react'
import styles from './styles.module.css'
import { IoLocationOutline, IoStarOutline, IoTodayOutline } from 'react-icons/io5';
import { IoIosTimer } from 'react-icons/io';
import Link from 'next/link';


const FeatureCard = ({
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
    }
}) => {
    return <>
        <Link 
            className={styles.card__Item}
            href={`/places?placeId=${featuredPlace.id}`}
        >
            <Image 
                src={featuredPlace.image}
                alt={featuredPlace.name}
                className={styles.card__Image}
            />

            <section className={styles.card__Content}>
                <h3 className={styles.header}>{featuredPlace.name}</h3>
                
                <p className={styles.content__Detail}>
                    <IoLocationOutline size={'1.2rem'} />
                    <span>{featuredPlace?.location?.address} {featuredPlace?.location?.city} {featuredPlace?.location?.state}</span>
                </p>

                <p className={styles.content__Detail}>
                    <IoIosTimer size={'1.2rem'} />
                    <span>{featuredPlace?.activity_hours?.opening_time} - {featuredPlace?.activity_hours?.closing_time}</span>
                </p>

                <p className={styles.content__Detail}>
                    <IoTodayOutline size={'1.2rem'} />
                    <span>{featuredPlace?.activity_hours?.days}</span>
                </p>

                <br />

                <section className={styles.bottom__Row}>
                    <p className={styles.content__Detail}>
                        <span className={styles.price__Intro}>From</span>
                        {/* <IoPricetagsOutline size={'1.2rem'} /> */}
                        <span className={styles.price}>${featuredPlace?.price}/month</span>
                    </p>

                    <p className={`${styles.content__Detail} ${styles.mini}`}>
                        <IoStarOutline size={'1.2rem'} />
                        <span>{featuredPlace.average_rating}</span>
                    </p>
                </section>
            </section>
        </Link>
    </>
}

export default FeatureCard