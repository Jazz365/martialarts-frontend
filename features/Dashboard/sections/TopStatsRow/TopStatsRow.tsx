import React from 'react'
import styles from './styles.module.css'
import StatItem from '../../components/StatItem/StatItem'

const TopStatsRow = () => {
    return <>
        <section className={styles.stats__Wrap}>
            <StatItem
                title='total bookings'
                count={100}
            />

            <StatItem
                title='total places'
                count={40}
            />

            <StatItem 
                title='total reviews'
                count={1320}
            />
            <StatItem 
                title='average rating'
                count={4.6}
            />
        </section>
    </>
}

export default TopStatsRow