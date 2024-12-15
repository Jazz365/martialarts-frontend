'use client';


import { allDummyPlaces } from '@/features/Search/sections/Places/utils';
import React, { useEffect, useState } from 'react'
import SinglePlaceGallery from '../../components/SinglePlaceGallery/SinglePlaceGallery';

const SinglePlaceView = ({
    id
}: {
    id: number | undefined | null;
}) => {
    const [ foundPlace, setFoundPlace ] = useState<IPlace | null | undefined>(null);

    useEffect(() => {
        setFoundPlace(
            allDummyPlaces.find(place => place.id === id)
        );
    }, [id])

    if (!id || !foundPlace) return <></>

    return <>
        <SinglePlaceGallery
            images={foundPlace?.images_data ?? []}
        />
    </>
}

export default SinglePlaceView