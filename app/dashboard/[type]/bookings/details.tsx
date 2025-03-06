'use client';


import React from 'react'
import styles from './styles.module.css'
import BookingSummaryItem from '@/features/Dashboard/components/BookingSummaryItem/BookingSummaryItem'
import Link from 'next/link';
import { bookingStatusList } from './utils';
import { useSearchParams } from 'next/navigation';
import { generateDashLinkForUser } from '@/helpers/helpers';
import { useUserContext } from '@/contexts/UserContext';
import { useBookingContext } from '@/contexts/BookingContext';
import { useAdminDataContext } from '@/contexts/AdminDataContext/AdminDataContext';


const BookingsDetail = () => {
    const {
        bookings,
    } = useBookingContext();

    const {
        allBookings,
    } = useAdminDataContext();

    const {
        userDetails
    } = useUserContext();

    const params = useSearchParams();

    const bookingsToShow = !userDetails ?
        []
    :
        userDetails.is_admin === true ?
        allBookings
    :
    bookings;

    return <>
        <h1 className={styles.header}>
            {
                !userDetails ?
                    ''
                :
                userDetails.is_admin === true ?
                    'Bookings'
                :
                userDetails?.is_owner === false ?
                    'Your classes'
                :
                'Your students'
            }
        </h1>

        <section className={styles.links__Wrap}>
            {
                React.Children.toArray(bookingStatusList.map(stat => {
                    return <Link
                        href={stat.length < 1 ? `${generateDashLinkForUser({ isAdmin: userDetails?.is_admin, isOwner: userDetails?.is_owner })}/bookings` : `?status=${stat}`}
                        key={stat}
                        className={`
                            ${styles.link__item} 
                            ${
                                ((params.get('status') === stat) || (stat.length < 1 && !params.get('status'))) ? 
                                    styles.active 
                                : 
                                ''
                            }`}
                    >
                        <span>{stat.length < 1 ? 'all' : stat}</span>

                        <span className={styles.highlight}></span>
                    </Link>
                }))
            }
        </section>

        <section className={styles.bookings}>
            {
                React.Children.toArray(bookingsToShow
                    .filter(booking => {
                        if (params.get('status')) {
                            return booking.status === params.get('status')?.toLocaleLowerCase();
                        }

                        return true
                    })
                    .map(booking => {
                        return <BookingSummaryItem 
                            booking={booking}
                            key={booking.id}
                            style={{
                                boxShadow: 'var(--card-box-shadow)',
                                border: 'none',
                            }}
                        />
                    })
                )
            }
        </section>
    </>
}

export default BookingsDetail