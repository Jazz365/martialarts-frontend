'use client';


import React from 'react'
import styles from '../styles.module.css'
import { useUserContext } from '@/contexts/UserContext';
import Button from '@/components/buttons/Button/Button';
import { formatPricingType } from '@/app/dashboard/[type]/studios/add-studio/utils';


const PlaceCardActions = ({
    place,
    isListView,
}: {
    place: IPlace;
    isListView: boolean;
}) => {
    const {
        userDetails,
    } = useUserContext();

    return (
        <section className={styles.actions__Wrap}>
          <h3 className={`${styles.header} ${styles.price}`}>
            <span className={styles.price__Intro}>from</span>
            {' '}
            {/* <span className={styles.price__Intro}>here</span> */}
            <span>${place.pricing}/{place.pricing_type ? formatPricingType(place.pricing_type) : 'month'}</span>
          </h3>

          {
            userDetails?.is_owner !== true ?
              <Button
                label='join class'
                style={{
                  padding: !isListView ? '0.75rem 1rem' : '0.65rem 1.2rem',
                  fontSize: '0.75rem',
                  backgroundColor: 'var(--red-color)',
                }}
                hoverStyle={{
                  backgroundColor: 'black',
                }}
                useLink
                linkLocation={`/places/${place.id}`}
                // handleClick={handleJoinClassBtnClick}
              />
            :
            <></>
          }
        </section>
    )
}

export default PlaceCardActions