import React from 'react'
import styles from './styles.module.css'
import { formatTimeString } from '@/helpers/helpers';


const OpeningHours = ({
    activityHours
}: {
    activityHours: IPlaceActivityHours[];
}) => {
    return (
        <section className={styles.content__Wrap}>
            <h3 className={styles.header}>opening hours</h3>

            <ul className={styles.benefits}>
                {
                    React.Children.toArray(activityHours.map(activity => {
                        return <li
                            key={activity.id}
                        >
                            <span>{activity.day}</span>
                            <span className={styles.time__Detail}>{formatTimeString(activity.opening_time)} - {formatTimeString(activity.closing_time)}</span>
                        </li>
                    }))
                }
            </ul>
        </section>
    )
}

export default OpeningHours