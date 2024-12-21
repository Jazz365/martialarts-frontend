'use client';


import React from 'react'
import styles from './styles.module.css'
import Button from '@/components/Button/Button'
import { useUserContext } from '@/contexts/UserContext'
import BookingSummaryItem from '../../components/BookingSummaryItem/BookingSummaryItem';
import { generateDashLinkForUser } from '@/helpers/helpers';
import { useAppContext } from '@/contexts/AppContext';


const Bookings = () => {
    const { userDetails } = useUserContext();

    const {
        bookings,
        bookingsLoading,
    } = useAppContext()

    return <>
        <section className={styles.content__Wrap}>
            <section className={styles.title__Wrap}>
                <h3 className={styles.title}>
                    {
                        userDetails?.is_owner === true ?
                            'New students'
                        :
                        'Recent bookings'
                    }
                </h3>

                <Button 
                    label='view all'
                    style={{
                        padding: 0,
                        width: 'max-content',
                        color: 'var(--primary-app-color)',
                        backgroundColor: 'transparent',
                        fontSize: '0.8rem'
                    }}
                    useLink={true}
                    linkLocation={`${generateDashLinkForUser(userDetails?.is_owner)}/bookings`}
                />
            </section>

            <section className={styles.bookings}>
                {
                    React.Children.toArray(bookings
                        .filter(booking => booking.status === 'pending')
                        .map(booking => {
                            return <BookingSummaryItem 
                                booking={booking}
                                key={booking.id}
                            />
                        })
                    )
                }
            </section>
        </section>
    </>
}

export default Bookings