'use client';

import React from 'react'
import styles from '../styles.module.css'
import { useAppContext } from '@/contexts/AppContext/AppContext';

const maxBenLengthForListView = 80;
const maxBenLengthForFullListView = 50;

const PlaceCardBenefits = ({
    place,
    isListView
}: {
    place: IPlace;
    isListView: boolean;
}) => {
    const placeBenefits = place.benefits.split(',').slice(0, 5);

    const {
        showMap
    } = useAppContext();


    return (
        <ul className={styles.benefits}>
          {
            React.Children.toArray(
              placeBenefits
              .map((benefit, benefitIndex) => {
                const lenForBenefit = !showMap ?  maxBenLengthForFullListView : maxBenLengthForListView;
                return <li 
                  className={styles.benefit__Item}
                  key={benefit + benefitIndex}
                >
                  {
                    (isListView || !showMap) ?
                      benefit.length > lenForBenefit ?
                        benefit.slice(0, lenForBenefit) + '...'
                      :
                      benefit
                    :
                    benefit
                  }
                </li>
            }))
          }
          {
            !isListView && placeBenefits.length < 5 &&
            React.Children.toArray(
              Array.from(Array(5 - placeBenefits.length).keys()).map(key => {
                return <li
                  className={styles.benefit__Item}
                  key={key}
                ></li>
              })
            )
          }
        </ul>
    )
}

export default PlaceCardBenefits