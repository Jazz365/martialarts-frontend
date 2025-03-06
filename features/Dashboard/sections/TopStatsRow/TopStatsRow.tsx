'use client';


import React from 'react'
import styles from './styles.module.css'
import StatItem from '../../components/StatItem/StatItem'
import { useUserContext } from '@/contexts/UserContext';
import { useBookingContext } from '@/contexts/BookingContext';
import { usePlaceContext } from '@/contexts/PlaceContext';
import { useAdminDataContext } from '@/contexts/AdminDataContext/AdminDataContext';

const TopStatsRow = () => {
    const {
        userPlaces,
        userPlacesLoading,
    } = usePlaceContext();

    const {
        userDetails,
    } = useUserContext();

    const {
        bookings,
        bookingsLoading,
    } = useBookingContext();

    const {
        dashboardData,
        dashboardDataLoading,
    } = useAdminDataContext();

    const totalReviews = userPlaces.flatMap(place => place.place_reviews ?? []);
    const averageRating = Number(
        Number(
            totalReviews.reduce((a, b) => a + (b.rating ?? 0), 0) / 
            totalReviews.length
        ).toFixed(2)
    );

    return <>
        <section className={styles.stats__Wrap}>
            {
                !userDetails ? <>
                    <StatItem title='' count={0} loading />
                    <StatItem title='' count={0} loading />
                    <StatItem title='' count={0} loading />
                    <StatItem title='' count={0} loading />
                </>
                :
                <>
                    {
                        userDetails.is_admin === true ? <>
                            <StatItem
                                title='total bookings'
                                count={dashboardData?.bookings.total ?? 0}
                                extraInfo={[
                                    `pending: ${dashboardData?.bookings.pending ?? 0}`,
                                    `confirmed: ${dashboardData?.bookings.confirmed ?? 0}`,
                                ]}
                                loading={dashboardDataLoading}
                            />
                            
                            <StatItem
                                title='total studios'
                                count={dashboardData?.places.total ?? 0}
                                extraInfo={[
                                    `drafts: ${dashboardData?.places.draft ?? 0}`,
                                    `published: ${dashboardData?.places.published ?? 0}`,
                                ]}
                                loading={dashboardDataLoading}
                            />
                            
                            <StatItem
                                title='total users'
                                count={dashboardData?.users.total ?? 0}
                                extraInfo={[
                                    `students: ${dashboardData?.users.students ?? 0}`,
                                    // `students: ${dashboardData?.users.total ? dashboardData.users.total - dashboardData.users.owners - 1 : 0}`,
                                    `owners: ${dashboardData?.users.owners ?? 0}`,
                                ]}
                                loading={dashboardDataLoading}
                            />
                            
                            <StatItem
                                title='total visits'
                                count={dashboardData?.visits.total ?? 0}
                                extraInfo={[
                                    `this week: ${dashboardData?.visits.week ?? 0}`,
                                    `this month: ${dashboardData?.visits.month ?? 0}`,
                                ]}
                                loading={dashboardDataLoading}
                            />
                        </>
                        :
                        userDetails?.is_owner === false ? <>
                            <StatItem
                                title='total bookings'
                                count={bookings.length}
                                loading={bookingsLoading}
                            />
                            
                            <StatItem
                                title='upcoming bookings'
                                count={bookings.filter(booking => booking.status === 'confirmed' && new Date(booking.date).getTime() >= new Date().getTime()).length}
                                loading={bookingsLoading}
                            />

                            <StatItem 
                                title='past bookings'
                                count={bookings.filter(booking => booking.status === 'confirmed' && new Date(booking.date).getTime() <= new Date().getTime()).length}
                                loading={bookingsLoading}
                            />
                            
                            <StatItem 
                                title={'cancelled bookings'}
                                count={bookings.filter(booking => booking.status === 'cancelled').length}
                                loading={bookingsLoading}
                            />
                        </>
                        :
                        <>
                            <StatItem
                                title='total bookings'
                                count={bookings.length}
                                loading={bookingsLoading}
                            />
                            
                            <StatItem
                                title='total studios'
                                count={userPlaces.length}
                                loading={userPlacesLoading}
                            />

                            <StatItem 
                                title='total reviews'
                                count={totalReviews.length}
                                loading={userPlacesLoading}
                            />

                            <StatItem 
                                title={'average rating'}
                                count={
                                    !isNaN(averageRating) ?
                                        averageRating   
                                    :
                                    0
                                }
                                useDecimal
                                loading={userPlacesLoading}
                            />
                        </>
                    }
                </>
            }
        </section>
    </>
}

export default TopStatsRow