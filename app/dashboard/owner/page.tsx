import React from 'react'
import styles from './styles.module.css'
import Greeting from '@/features/Dashboard/components/Greeting/Greeting'
import CustomBarChart from '@/components/BarChart/BarChart'
import TopStatsRow from '@/features/Dashboard/sections/TopStatsRow/TopStatsRow'
import Bookings from '@/features/Dashboard/sections/Bookings/Bookings'


const Home = () => {
    return <>
        <section className={styles.page__Wrap}>
            <Greeting />

            <TopStatsRow />

            <section className={styles.user__Stats}>
                <CustomBarChart
                    title='listing views growth'
                    subtitle='get insights into how well your listings are performing'
                    data={[
                        { name: 'Place 1', views: 10 },
                        { name: 'Place 2', views: 8 },
                        { name: 'Place 3', views: 15 },
                        { name: 'Place 4', views: 10 },
                        { name: 'Place 5', views: 21 },
                        { name: 'Place 6', views: 30 },
                        { name: 'Place 7', views: 15 },
                        { name: 'Place 8', views: 15 },
                    ]}
                    dataKeyName='views'
                    labelKeyName='name'
                />

                <Bookings />
            </section>

            <section style={{ width: '100%', height: '200px', backgroundColor: 'rebeccapurple' }}></section>
        </section>
    </>
}

export default Home