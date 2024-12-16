import React from 'react'
import styles from './styles.module.css'


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
                            <span>{activity.opening_time} - {activity.closing_time}</span>
                        </li>
                    }))
                }
            </ul>
        </section>
    )
}

export default OpeningHours