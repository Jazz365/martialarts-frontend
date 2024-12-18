'use client';


import React from 'react'
import styles from '../styles.module.css'
import Greeting from '@/features/Dashboard/components/Greeting/Greeting'
import CustomBarChart from '@/components/Charts/BarChart'
import TopStatsRow from '@/features/Dashboard/sections/TopStatsRow/TopStatsRow'
import Bookings from '@/features/Dashboard/sections/Bookings/Bookings'
import { useAppContext } from '@/contexts/AppContext'


const Home = () => {
    const {
        placesViewStats,
    } = useAppContext();

    return <>
        <section className={styles.page__Wrap}>
            <Greeting />

            <TopStatsRow />

            <section className={styles.user__Stats}>
                <CustomBarChart
                    title='listing views growth'
                    subtitle='get insights into how well your listings are performing'
                    data={placesViewStats}
                    dataKeyName='views'
                    labelKeyName='name'
                />

                <Bookings />
            </section>
        </section>
    </>
}

export default Home