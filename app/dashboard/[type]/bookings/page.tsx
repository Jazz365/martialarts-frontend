import React from 'react'
import styles from './styles.module.css'
import { Metadata } from 'next'
import BookingsDetail from './details'


export const metadata: Metadata = {
    title: 'Bookings | Dasboard'
}

const BookingsPage = () => {
    return <>
        <section className={styles.content__Wrap}>
            <h1 className={styles.header}>Your bookings</h1>

            <BookingsDetail />
        </section>
    </>
}

export default BookingsPage