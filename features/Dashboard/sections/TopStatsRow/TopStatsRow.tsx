'use client';


import React from 'react'
import styles from './styles.module.css'
import StatItem from '../../components/StatItem/StatItem'
import { useAppContext } from '@/contexts/AppContext'
import { useUserContext } from '@/contexts/UserContext';

const TopStatsRow = () => {
    const {
        userPlaces,
        bookings,
    } = useAppContext();

    const {
        userDetails
    } = useUserContext();

    return <>
        <section className={styles.stats__Wrap}>
            <StatItem
                title='total bookings'
                count={bookings.length}
            />

            {
                !userDetails ? <>
                    <div style={{ width: '100%' }}></div>
                    <div style={{ width: '100%' }}></div>
                    <div style={{ width: '100%' }}></div>
                </>
                :
                userDetails?.is_owner === false ?
                    <>
                        <StatItem
                            title='upcoming bookings'
                            count={bookings.filter(booking => booking.status === 'confirmed' && new Date(booking.date).getTime() >= new Date().getTime()).length}
                        />

                        <StatItem 
                            title='past bookings'
                            count={bookings.filter(booking => booking.status === 'confirmed' && new Date(booking.date).getTime() <= new Date().getTime()).length}
                        />
                        
                        <StatItem 
                            title={'cancelled bookings'}
                            count={bookings.filter(booking => booking.status === 'cancelled').length}
                        />
                    </>
                :
                <>
                    <StatItem
                        title='total studios'
                        count={userPlaces.length}
                    />

                    <StatItem 
                        title='total reviews'
                        count={0}
                    />
                    
                    <StatItem 
                        title={'average rating'}
                        count={0.0}
                    />
                </>
            }
        </section>
    </>
}

export default TopStatsRow