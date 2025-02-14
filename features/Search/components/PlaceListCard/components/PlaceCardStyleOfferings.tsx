'use client';


import React, { useEffect, useState } from 'react'
import styles from '../styles.module.css'
import useMobile from '@/hooks/useMobile';
import { useAppContext } from '@/contexts/AppContext/AppContext';
import { formatTimeString } from '@/helpers/helpers';

const PlaceCardStyleOfferings = ({
  place,
  isListView,
}: {
  place: IPlace;
  isListView: boolean;
}) => {
  const [ maxofferingLength, setMaxOfferingLength] = useState(70);
  
  const isMobile = useMobile();
  
  const {
    showMap,
  } = useAppContext();

  const [
    placeStyles,
    placeCatersTo,
    placeTimes,
  ] = [
    `${place.place_styles.map(style => style.name).join(', ')}`,
    `${place.place_caters_to.map(cat => cat.name).join(', ')}`,
    `${
    place.place_activity_hours
    .filter(act => act?.opening_time && act?.opening_time?.length > 0 && act?.closing_time && act?.closing_time?.length > 0)
    .map(act => {
      const [
        openingTimeFormatted,
        closingTimeFormatted,
      ] = [
        formatTimeString(act.opening_time ?? ''),
        formatTimeString(act.closing_time ?? ''),
      ];
      return `${act.day} (${openingTimeFormatted} - ${closingTimeFormatted})`;
    })
    .join(', ')
    }`,
  ]

  useEffect(() => {
    if (isMobile) {
      return setMaxOfferingLength(30);
    }

    if (isListView) {
      if (showMap === false) return setMaxOfferingLength(50);
      return setMaxOfferingLength(70);
    }

    setMaxOfferingLength(30);
  }, [isMobile, isListView, showMap])

  return (
    <section className={styles.offerings_row}>
      <p className={styles.offerings}>
        <span>Styles offered:</span>
        <span>
          {
            placeStyles.length > maxofferingLength ?
              placeStyles.slice(0, maxofferingLength) + '...'
            :
            placeStyles
          }
        </span>
      </p>

      <p className={styles.offerings}>
        <span>Skill levels:</span>
        <span>
          {
            placeCatersTo.length > maxofferingLength ?
              placeCatersTo.slice(0, maxofferingLength) + '...'
            :
            placeCatersTo
          }
        </span>
      </p>

      <p className={styles.offerings}>
        <span>Class times:</span>
        <span>
          {
            placeTimes.length > maxofferingLength ?
              placeTimes.slice(0, maxofferingLength) + '...'
            :
            placeTimes
          }
        </span>
      </p>
    </section>
  )
}

export default PlaceCardStyleOfferings