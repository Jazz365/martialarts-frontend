'use client'

import React, { useEffect, useState } from 'react'
import styles from '../styles.module.css'
import Link from 'next/link'
import { generateDashLinkForUser } from '@/helpers/helpers';
import { IoLocationOutline, IoStar, IoStarOutline } from 'react-icons/io5';
import { useUserContext } from '@/contexts/UserContext';
import Button from '@/components/buttons/Button/Button';
import { Tooltip } from 'react-tooltip';
import { AdminService } from '@/services/adminService';
import { AppConstants } from '@/utils/constants';
import { toast } from 'sonner';


const PlaceCardTitle = ({
  place,
  isListView,
}: {
  place: IPlace;
  isListView: boolean;
}) => {
  const {
    userDetails,
  } = useUserContext();

  const [
    placeLocation,
    placeName,
  ] = [
    place?.place_locations?.length > 0 ? 
    `${place?.place_locations[0]?.address}`
    :
    ``,
    `${place.name}`,
  ];

  const [ featureStatus, setFeatureStatus ] = useState(false);
  const [ featuredStatusUpdating, setFeaturedStatusUpdating ] = useState(false);

  const adminService = new AdminService();

  useEffect(() => {
    setFeatureStatus(place.is_featured);
  }, [])

  const handleTogglePlaceFeatureStatus = async () => {
    const savedToken = AppConstants.savedToken;
    const featureUpdateType = featureStatus === true ? 'unfeature' : 'feature';

    if (featuredStatusUpdating || !savedToken) return;

    setFeaturedStatusUpdating(true);

    try {
      await adminService.updatePlaceFeaturedStatus(savedToken, place.id, featureUpdateType);
      setFeaturedStatusUpdating(false);
      setFeatureStatus(!featureStatus);

      toast.success(`Successfully ${featureUpdateType}d place!`);
    } catch (error) {
      setFeaturedStatusUpdating(false);
    }
  }

  return <>
    <section className={styles.top__Row}>
      <section className={styles.header__Wrap}>
        <section className={styles.title}>
          <Link
            className={`${styles.header} ${styles.place__Name}`}
            href={`/places/${place.id}`}
          >
            {placeName}
          </Link>
          
          <section className={styles.place__Actions}>
            {
              userDetails?.id === place.owner ?
                <Button
                  label='edit'
                  style={{
                    padding: '0.45rem 1.2rem',
                    border: '1px solid #000',
                    background: 'transparent',
                    color: '#000',
                    fontSize: '0.75rem'
                  }}
                  hoverStyle={{
                    background: 'var(--primary-app-color)',
                    borderColor: 'transparent',
                    color: '#fff'
                  }}
                  useLink
                  linkLocation={`${generateDashLinkForUser({ isOwner: true })}/studios/add-studio?id=${place.id}`}
                />
              :
              <></>
            }

            {
              userDetails && userDetails.is_admin === true && <>
                <section
                  data-tooltip-content={
                    featuredStatusUpdating ? 
                      'Updating...' 
                    :
                    `${featureStatus === true ? 'Unfeature' : 'Feature'} studio`
                  }
                  data-tooltip-id={`place-featured-${place.id}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleTogglePlaceFeatureStatus()}
                >
                  {
                    featuredStatusUpdating ?
                      <span>...</span>
                    :
                    featureStatus === true ?
                      <IoStar fill='var(--primary-app-color)' size={'1.4rem'} />
                    :
                    <IoStarOutline size={'1.4rem'} />
                  }
                </section>

                <Tooltip 
                  id={`place-featured-${place.id}`}
                  style={{
                    fontSize: '0.75rem'
                  }}
                />      
              </>
            }
          </section>
        </section>

        {/* <div className={styles.detail__Item}>
          <Rate
            allowHalf={true}
            value={place.average_rating}
            disabled={true}
            style={{
              fontSize: '1.5rem',
            }}
          />
          <span>{Number(place.average_rating).toFixed(1)}</span>
          
          <span></span>
          <span></span>
          <span></span>

          <span className={styles.grey__Content}>{place?.reviews?.length ?? 0} review{place?.reviews?.length > 1 ? 's' : ''}</span>
        </div> */}

        <p className={styles.detail__Item}>
          <IoLocationOutline size={'1.2rem'} />
          <span className={styles.location}>
            {placeLocation}
          </span>      
        </p>
      </section>
    </section>
  </>
}

export default PlaceCardTitle