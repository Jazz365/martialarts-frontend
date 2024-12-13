
import React from 'react'
import styles from './styles.module.css'
import { Metadata } from 'next';
import AllPlacesDetails from './details';


export const metadata: Metadata = {
    title: 'Places | Dasboard'
}

const PlacesPage = () => {
    return <>
        <section className={styles.content__Wrap}>
            <h1 className={styles.header}>Your places</h1>

            <AllPlacesDetails />
        </section>
    </>
}

export default PlacesPage