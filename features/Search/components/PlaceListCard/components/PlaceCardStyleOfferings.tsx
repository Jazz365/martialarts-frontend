import React from 'react'
import styles from '../styles.module.css'
import { formatTimeString } from '@/helpers/helpers';

const PlaceCardStyleOfferings = ({
  place,
}: {
  place: IPlace;
}) => {
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

  return (
    <section className={styles.offerings_row}>
      <p className={styles.offerings}>
        <span>Styles offered:</span>
        <span className={styles.offering__Info}>
          {placeStyles}
        </span>
      </p>

      <p className={styles.offerings}>
        <span>Skill levels:</span>
        <span className={styles.offering__Info}>
          {placeCatersTo}
        </span>
      </p>

      <p className={styles.offerings}>
        <span>Class times:</span>
        <span className={styles.offering__Info}>
          {placeTimes}
        </span>
      </p>
    </section>
  )
}

export default PlaceCardStyleOfferings