'use client';

import MemoizedImage from '@/components/common/MemoizedImage/MemoizedImage';
import React, { memo, useEffect, useRef, useState } from 'react'
import { IoLocationOutline } from 'react-icons/io5';
import styles from '../styles.module.css'
import { RiCheckDoubleFill, RiDraftLine } from "react-icons/ri";
import { HiDotsVertical } from 'react-icons/hi';
import AdminPlaceCardOptions from './AdminPlaceCardOptions';
import useClickOutside from '@/hooks/useClickOutside';
import { HiOutlineArchiveBoxXMark } from 'react-icons/hi2';

const AdminPlaceCardHeader = memo(({
    placeId,
    name,
    status,
    images=[],
    locations=[],
    isFeatured=false,
}: {
    placeId: number;
    name: string;
    status: keyof typeof IPlaceStatus;
    images: IPlaceImage[];
    locations: ILocation[];
    isFeatured: boolean;
}) => {
    const placeLocation = locations.length > 0 ? 
        `${locations[0]?.address}`
    :
    ``;

    const [ showOptions, setShowOptions ] = useState(false);
    const [ featureStatus, setFeatureStatus ] = useState(false);
    const [ placeStatus, setPlaceStatus ] = useState<keyof typeof IPlaceStatus>('draft');

    const optionsRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        setFeatureStatus(isFeatured);
        setPlaceStatus(status)
    }, [])

    useClickOutside({
        elemRef: optionsRef,
        handleClickOutside: () => setShowOptions(false),
    });

    return (
        <>
            <section className={styles.place__Header__Wrap}>
                <section 
                    className={`${styles.place__Status} ${
                        placeStatus === 'draft' ?
                            styles.draft
                        :
                        placeStatus === 'published' ?
                            styles.published
                        :
                        placeStatus === 'archived' ?
                            styles.archived
                        :
                        ''
                    }`}
                >
                    {
                        placeStatus === 'draft' ?
                            <RiDraftLine />
                        :
                        placeStatus === 'published' ?
                            <RiCheckDoubleFill />
                        :
                        placeStatus === 'archived' ?
                            <HiOutlineArchiveBoxXMark />
                        :
                        <></>
                    }
                    <p>{placeStatus}</p>
                </section>

                <section className={styles.action__Wrap}>
                    <HiDotsVertical 
                        cursor={'pointer'}
                        onClick={() => setShowOptions(!showOptions)}
                    />

                    {
                        showOptions &&
                        <AdminPlaceCardOptions 
                            ref={optionsRef}
                            placeId={placeId}
                            placeName={name}
                            placeIsFeatured={featureStatus}
                            updatePlaceFeaturedStatus={(passedStatus: boolean) => setFeatureStatus(passedStatus)}
                            status={placeStatus}
                            updatePlaceStatus={(passedStatus: keyof typeof IPlaceStatus) => setPlaceStatus(passedStatus)}
                        />
                    }
                </section>
            </section>

            <section className={styles.place__Title__Wrap}>
                <MemoizedImage
                    src={images[0].image as string}
                    alt={name}
                    width={60}
                    height={60}
                    unoptimized
                    style={{
                        objectFit: 'cover',
                        borderRadius: '8px',
                        willChange: 'unset',
                        contentVisibility: 'unset',
                        contain: 'unset',
                    }}
                />

                <section>
                    <h2 className={styles.place__Title}>{name}</h2>
                    <p className={styles.place__Location}>
                        <IoLocationOutline />
                        <span>{placeLocation}</span>
                    </p>
                </section>
            </section>
        </>
    )
})

export default AdminPlaceCardHeader