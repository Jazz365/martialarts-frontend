import { Metadata } from 'next'
import React from 'react'
import styles from './styles.module.css'
import AllStudiosDetail from './details'

export const metadata: Metadata = {
    title: 'Studios | Dashboard'
}


const StudiosListingPage = () => {
    return (
        <section className={styles.content__Wrap}>
            <h1 className={styles.header}>Studios</h1>

            <AllStudiosDetail />
        </section>
    )
}

export default StudiosListingPage