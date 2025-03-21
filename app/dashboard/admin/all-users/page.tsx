import { Metadata } from 'next'
import React from 'react'
import styles from './styles.module.css'
import AllUsersDetails from './details'


export const metadata: Metadata = {
    title: 'Users | Dashboard'
}


const UserListingPage = () => {
    return (
        <section className={styles.page__Wrap}>
            <h1 className={styles.header}>Users</h1>

            <AllUsersDetails />
        </section>
    )
}

export default UserListingPage;