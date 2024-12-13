'use client';


import { generateDashLinkForUser, getDayOfTheWeek } from '@/helpers/helpers';
import React from 'react'
import { AiFillClockCircle } from 'react-icons/ai';
import styles from './styles.module.css'
import { Tooltip } from 'react-tooltip';
import Link from 'next/link';
import { useUserContext } from '@/contexts/UserContext';


const BookingSummaryItem = ({
    booking,
}: {
    booking: IBooking;
}) => {
    const { userDetails } = useUserContext();

    return (
        <Link 
            className={styles.item__Wrap}
            href={`${generateDashLinkForUser(userDetails?.is_owner)}/bookings/${booking.id}`}
        >
            <section className={styles.date__Wrap}>
                <h5 className={styles.date__Day__Txt}>
                    {getDayOfTheWeek(new Date(booking.date))}
                </h5>

                <p className={styles.date__Day__Num}>
                    {new Date(booking.date).getDate() < 10 ? '0' : ''}{new Date(booking.date).getDate()}
                </p>

                <h5 className={styles.date__Day__Year}>
                    {new Date(booking.date).getFullYear()}
                </h5>
            </section>

            <section className={styles.vert__Divider}></section>

            <section className={styles.item__Details__Wrap}>
                <section className={styles.item__Details}>
                    <div className={styles.item__Schedule__Time}>
                        <AiFillClockCircle 
                            fill='#333'
                            size={'1rem'}
                        />
                        <p>{booking.time}</p>
                    </div>
                    
                    
                    <p className={styles.user__Info}>
                        {booking.user}
                    </p>
                </section>

                <Tooltip 
                    id={`booking-${booking.id}`}
                    style={{
                        fontSize: '0.75rem'
                    }}
                />

                <section 
                    className={`${styles.status} ${styles[booking.status]}`}
                    data-tooltip-content={booking.status}
                    data-tooltip-id={`booking-${booking.id}`}
                ></section>
            </section>
        </Link>
    )
}

export default BookingSummaryItem;