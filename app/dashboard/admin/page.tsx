'use client';

import Greeting from '@/features/Dashboard/components/Greeting/Greeting'
import React, { useState } from 'react'
import styles from './styles.module.css'
import { useAdminDataContext } from '@/contexts/AdminDataContext/AdminDataContext';
import TopStatsRow from '@/features/Dashboard/sections/TopStatsRow/TopStatsRow';
import { placesStatViewOptions } from './utils';
import CustomBarChart from '@/components/Charts/BarChart';
import CustomPieChart from '@/components/Charts/PieChart';
import CustomLineChart from '@/components/Charts/LineChart';
import { formatDateV2 } from '@/helpers/helpers';


const Home = () => {
    const {
        dashboardData,
        dashboardDataLoaded,
        dashboardDataLoading,
    } = useAdminDataContext();

    if (dashboardDataLoaded) console.log(dashboardData);

    const [ currentPlaceStatId, setCurrentPlaceStatId ] = useState<string>(placesStatViewOptions[0].id);

    const currentPlaceStatDetail = placesStatViewOptions.find(statOption => statOption.id === currentPlaceStatId);
    const currentPlaceStatData = dashboardData && currentPlaceStatDetail ? 
        dashboardData.places[currentPlaceStatDetail.dataItemKey]
        :
    [];

    return <>
        <section className={styles.page__Wrap}>
            <Greeting />

            <TopStatsRow />

            <section className={styles.user__Stats}>
                <CustomBarChart 
                    title={'studio insights'}
                    subtitle={currentPlaceStatDetail?.subtitle ?? ''}
                    data={
                        currentPlaceStatData && Array.isArray(currentPlaceStatData) ?
                            currentPlaceStatData
                        : 
                        []
                    }
                    dataKeyName={currentPlaceStatDetail?.datasetKey ?? ''}
                    labelKeyName={currentPlaceStatDetail?.labelKey ?? ''}
                    isLoading={dashboardDataLoading}
                    hasDataSelect
                    dataSelectOptions={placesStatViewOptions.map(option => ({ id: option.id, label: option.title, value: option.id }))}
                    dataSelectValue={currentPlaceStatId}
                    handleUpdateDataSelectValue={(val) => setCurrentPlaceStatId(val)}
                    height={580}
                />

                <section className={styles.other__Insights}>
                    <CustomPieChart 
                        title='subscription overview'
                        subtitle='current distribution of user subscriptions'
                        data={[
                            { name: 'active', value: dashboardData?.subscriptions.active ?? 0 },
                            { name: 'new', value: dashboardData?.subscriptions.new_30d ?? 0 },
                            { name: 'on trial', value: dashboardData?.subscriptions.trial ?? 0 },
                        ]}
                        height={200}
                        isLoading={dashboardDataLoading}
                    />

                    <CustomLineChart
                        title='Bookings overview'
                        subtitle='get insights on recent booking activity and trends'
                        data={
                            dashboardData ?
                                dashboardData.bookings.trend.map(trendItem => ({ ...trendItem, date: formatDateV2(trendItem.date) }))
                            :
                            []
                        }
                        dataKeyName='count'
                        labelKeyName='date'
                        height={240}
                        fontSize={10}
                        isLoading={dashboardDataLoading}
                    />
                </section>
            </section>
        </section>
    </>
}

export default Home;