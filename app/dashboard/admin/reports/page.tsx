import { Metadata } from 'next'
import React from 'react'
import styles from './styles.module.css'
import ReportsDetails from './details'


export const metadata: Metadata = {
    title: 'Reports | Dashboard'
}


const ReportsPage = () => {
    return (
        <section className={styles.content__Wrap}>
            <h1 className={styles.header}>Reports</h1>

            <ReportsDetails />
        </section>
    )
}

export default ReportsPage;