'use client';


import React from 'react'
import styles from './styles.module.css'
import Button from '@/components/buttons/Button/Button'
import { useUserContext } from '@/contexts/UserContext'
import BookingSummaryItem from '../../components/BookingSummaryItem/BookingSummaryItem';
import { generateDashLinkForUser } from '@/helpers/helpers';
import PageLoader from '@/components/loaders/PageLoader/PageLoader';
import { useBookingContext } from '@/contexts/BookingContext';


const Bookings = () => {
    const { userDetails } = useUserContext();

    const {
        bookings,
        bookingsLoading,
    } = useBookingContext();

    return <>
        <section className={styles.content__Wrap}>
            <section className={styles.title__Wrap}>
                <h3 className={styles.title}>
                    {
                        !userDetails ?
                            ''
                        :
                        userDetails?.is_owner === true ?
                            'New students'
                        :
                        'Classes joined'
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
                    linkLocation={`${generateDashLinkForUser({ isAdmin: userDetails?.is_admin, isOwner: userDetails?.is_owner })}/bookings`}
                />
            </section>

            {
                bookingsLoading ?
                    <PageLoader />
                :
                <section className={styles.bookings}>
                    {
                        React.Children.toArray(
                            bookings
                            .slice(0, 5)
                            .filter((booking) => {
                                return booking.status !== 'cancelled';
                            })
                            .map(booking => {
                                return <BookingSummaryItem 
                                    booking={booking}
                                    key={booking.id}
                                />
                            })
                        )
                    }
                </section>
            }
        </section>
    </>
}

export default Bookings