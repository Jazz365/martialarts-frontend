import React from 'react'
import styles from '../styles.module.css'

const PlaceCardBenefits = ({
  place,
  isListView
}: {
  place: IPlace;
  isListView: boolean;
}) => {
  const placeBenefits = place.benefits.split('\n').slice(0, 5);

  return (
    <ul className={styles.benefits}>
      {
        React.Children.toArray(
          placeBenefits
          .map((benefit, benefitIndex) => {
            return <li 
              className={styles.benefit__Item}
              key={benefit + benefitIndex}
            >
              {benefit}
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