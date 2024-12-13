import React from 'react'
import styles from './styles.module.css'
import { dummyBookings } from '@/features/Dashboard/sections/Bookings/utils'
import BookingSummaryItem from '@/features/Dashboard/components/BookingSummaryItem/BookingSummaryItem'


const BookingsDetail = () => {
    return <>
        <section className={styles.bookings}>
            {
                React.Children.toArray(dummyBookings.map(booking => {
                    return <BookingSummaryItem 
                        booking={booking}
                        key={booking.id}
                    />
                }))
            }
        </section>
    </>
}

export default BookingsDetail