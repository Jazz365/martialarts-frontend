'use client';

import React, { useEffect, useState } from 'react'
import SinglePlaceGallery from '../../components/SinglePlaceGallery/SinglePlaceGallery';
import { PlaceService } from '@/services/placeService';
import PageLoader from '@/components/PageLoader/PageLoader';
import SinglePlaceHeader from '../../components/SinglePlaceHeader/SinglePlaceHeader';
import styles from './styles.module.css'
import SinglePlaceBenefits from '../../components/SinglePlaceBenefits/SinglePlaceBenefits';
import Divider from '../../components/Divider/Divider';
import SinglePlaceDescription from '../../components/SinglePlaceDescription/SinglePlaceDescription';
import ContactInfo from '../../components/ContactInfo/ContactInfo';
import OpeningHours from '../../components/OpeningHours/OpeningHours';
import FaqInfo from '../../components/FaqInfo/FaqInfo';
import NewBooking from '../../components/NewBooking/NewBooking';
import SinglePlaceLocation from '../../components/SinglePlaceLocation/SinglePlaceLocation';
import PlaceReviews from '../../components/PlaceReviews/PlaceReviews';


const SinglePlaceView = ({
    id
}: {
    id: number | undefined | null;
}) => {
    const [ foundPlace, setFoundPlace ] = useState<IPlace | null | undefined>(null);
    const [ loading, setLoading ] = useState(false);
    const [ loaded, setLoaded ] = useState(false);

    const placeService = new PlaceService();

    useEffect(() => {
        if (!id || loaded) return;

        setLoading(true);

        placeService.getSinglePlace(id).then(res => {
            setFoundPlace(res);
            setLoaded(true);
            setLoading(false);

            window.scrollTo(0, 0);
        }).catch(() => {
            setLoaded(true);
            setLoading(false);
        });
    }, [id])

    if (!id) return <section style={{ height: '70dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}></section>

    if (loading) return <section style={{ height: '70dvh' }}>
        <PageLoader />
    </section>

    if (!foundPlace) return <section style={{ height: '70dvh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ padding: '4rem', textAlign: 'center'}}>No studio found</p>
    </section>

    return <>
        <SinglePlaceGallery
            images={foundPlace?.images_data ?? []}
        />

        <section className={styles.wrapper}>
            <section className={styles.content__Wrap}>
                <SinglePlaceHeader 
                    place={foundPlace}
                />

                <Divider />

                <SinglePlaceBenefits 
                    benefits={foundPlace.benefits?.split(',')}
                />

                <Divider />

                <SinglePlaceDescription 
                    description={foundPlace.description}
                    video={foundPlace.video}
                    masters={foundPlace.master_images_data}
                />

                <Divider />

                <ContactInfo
                    email={foundPlace.email}
                    website={foundPlace.website}
                    phoneNumber={foundPlace.phone_number}
                />

                <Divider />

                <SinglePlaceLocation 
                    placeName={foundPlace.name}
                    locations={foundPlace.place_locations}
                />

                <Divider />

                <OpeningHours 
                    activityHours={foundPlace.place_activity_hours}
                />

                <Divider />

                <FaqInfo 
                    placeFaqs={foundPlace.place_faqs}
                />

                <Divider />

                <PlaceReviews 
                    reviews={foundPlace.place_reviews ?? []}
                />
            </section>

            <NewBooking
                place={foundPlace}
            />
        </section>        
    </>
}

export default SinglePlaceView