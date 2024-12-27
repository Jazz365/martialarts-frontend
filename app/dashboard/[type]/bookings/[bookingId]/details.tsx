'use client';

import styles from './styles.module.css'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/contexts/AppContext';
import { formatTimeString } from '@/helpers/helpers';
import Divider from '@/features/Places/components/Divider/Divider';
import Button from '@/components/Button/Button';
import { useUserContext } from '@/contexts/UserContext';
import { BookingService } from '@/services/bookingService';
import { AppConstants } from '@/utils/constants';


const SingleBookingDetailContent = ({
    bookingId,
}: {
    bookingId: number | undefined;
}) => {
    const {
        bookings,
        setBookings,
    } = useAppContext();

    const {
        userDetails
    } = useUserContext();

    const [ bookingDetail, setBookingDetail ] = useState<IBooking | null | undefined>(null);
    const [ loading, setLoading ] = useState(false);

    const bookingService = new BookingService();

    useEffect(() => {
        if (!bookingId) return;

        setBookingDetail(bookings.find(booking => booking.id === Number(bookingId)));
    }, [bookingId, bookings])

    const updateSingleBookingDetail = (bookingId: number, status: keyof typeof BookingStatus) => {
        const copyOfBookings = bookings.slice();
        const foundBooking = copyOfBookings.find(booking => booking.id === bookingId);
        if (!foundBooking) return setLoading(false);

        foundBooking.status = status;
        setBookings(copyOfBookings);
        setLoading(false);
    }

    const handleConfirmBooking = async () => {
        const authToken = AppConstants.getSavedToken();
        if (loading || !authToken || !bookingDetail) return;

        setLoading(true);

        try {
            const res = await bookingService.manageBookingStatus(authToken, bookingDetail?.id, {
                status: 'confirmed',
            });

            updateSingleBookingDetail(bookingDetail.id, 'confirmed');
        } catch (error) {
            setLoading(false);
        }
    }

    const handleCancelBooking = async () => {
        const authToken = AppConstants.getSavedToken();
        if (loading || !authToken || !bookingDetail) return;

        setLoading(true);

        try {
            const res = await bookingService.cancelBooking(authToken, bookingDetail?.id);

            updateSingleBookingDetail(bookingDetail.id, 'cancelled');
        } catch (error) {
            setLoading(false);
        }
    }
    
    if (!bookingDetail) return <></>

    return (
        <section className={styles.content__Detail}>
            {
                bookingDetail.status === 'pending' &&
                <Button 
                    label={
                        loading ?
                            'updating...'
                        :
                        userDetails?.is_owner === true ?
                            'confirm'
                        :
                        'cancel'
                    }
                    style={{
                        width: 'max-content',
                        marginLeft: 'auto',
                        fontSize: '0.75rem',
                    }}
                    handleClick={
                        userDetails?.is_owner === true ?
                            () => handleConfirmBooking()
                        :
                        () => handleCancelBooking()
                    }
                />
            }

            <p className={styles.header_min}>basic information</p>
            <p>
                <span>date</span>
                <span>{new Date(bookingDetail?.date).toDateString()}</span>
            </p>

            {/* <p>
                <span>time</span>
                <span>{formatTimeString(bookingDetail?.time)}</span>
            </p> */}

            <p>
                <span>email</span>
                <span>{bookingDetail.email}</span>
            </p>

            <p>
                <span>name</span>
                <span>{bookingDetail.name}</span>
            </p>

            <p>
                <span>phone number</span>
                <span>{bookingDetail.phone}</span>
            </p>

            <p>
                <span>studio</span>
                <span>{bookingDetail.place.name}</span>
            </p>

            <p>
                <span>location</span>
                <span>{bookingDetail.location}</span>
            </p>

            <p>
                <span>style preferences</span>
                <span>{bookingDetail.selected_styles.map(style => style.name).join(', ')}</span>
            </p>

            <p>
                <span>status</span>
                <span>{bookingDetail.status}</span>
            </p>

            {
                bookingDetail.is_for_child === true ? <>
                    <Divider />

                    <p className={styles.header_min}>Child information</p>

                    <p>
                        <span>name</span>
                        <span>{bookingDetail.child_name}</span>
                    </p>
                    
                    <p>
                        <span>date of birth</span>
                        <span>{new Date(bookingDetail.child_dob ?? '').toDateString()}</span>
                    </p>

                    <p>
                        <span>email</span>
                        <span>{bookingDetail.child_email}</span>
                    </p>
                </>
                :
                <></>
            }

            <Divider />
            
            <p className={styles.header_min}>terms agreement</p>

            <p>
                <span>agreed to health declaration</span>
                <span>{bookingDetail.agreed_to_health_declaration === true ? 'yes' : 'no'}</span>
            </p>

            <p>
                <span>agreed to liability waiver</span>
                <span>{bookingDetail.agreed_to_liability_waiver === true ? 'yes' : 'no'}</span>
            </p>

        </section>
    )   
}

export default SingleBookingDetailContent