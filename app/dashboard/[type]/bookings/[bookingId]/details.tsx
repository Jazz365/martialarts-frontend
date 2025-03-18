'use client';

import styles from './styles.module.css'
import React, { useEffect, useMemo, useState } from 'react'
import Divider from '@/features/Places/components/Divider/Divider';
import Button from '@/components/buttons/Button/Button';
import { useUserContext } from '@/contexts/UserContext';
import { BookingService } from '@/services/bookingService';
import { AppConstants } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { useBookingContext } from '@/contexts/BookingContext';
import { formatDateV2 } from '@/helpers/helpers';
import { useAdminDataContext } from '@/contexts/AdminDataContext/AdminDataContext';
import { IoCheckmark, IoClose } from 'react-icons/io5';


const SingleBookingDetailContent = ({
    bookingId,
}: {
    bookingId: number | undefined;
}) => {
    const {
        bookings,
        setBookings,
    } = useBookingContext();
    
    const {
        allBookings,
        setAllBookings,
    } = useAdminDataContext();

    const {
        userDetails
    } = useUserContext();

    const [ bookingDetail, setBookingDetail ] = useState<IBooking | null | undefined>(null);
    const [ loading, setLoading ] = useState(false);

    const router = useRouter();

    const bookingService = new BookingService();
    
    const bookingsToShow = useMemo(() => {
        if (!userDetails) return [];

        if (userDetails.is_admin === true) return allBookings;

        return bookings;
    }, [userDetails, bookings, allBookings]);

    const updateBookingsData = (data: IBooking[]) => {
        if (!userDetails) return;

        if (userDetails.is_admin === true) return setAllBookings(data);

        setBookings(data);
    }

    useEffect(() => {
        if (!bookingId) return;

        setBookingDetail(bookingsToShow.find(booking => booking.id === Number(bookingId)));
    }, [bookingId, bookingsToShow])

    const updateSingleBookingDetail = (bookingId: number, status: keyof typeof BookingStatus) => {
        const copyOfBookings = bookingsToShow.slice();
        const foundBooking = copyOfBookings.find(booking => booking.id === bookingId);
        if (!foundBooking) return setLoading(false);

        foundBooking.status = status;
        updateBookingsData(copyOfBookings);
        setLoading(false);
    }

    const handleConfirmBooking = async () => {
        const authToken = AppConstants.savedToken;
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
        const authToken = AppConstants.savedToken;
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
            <p className={styles.header_min}>basic information</p>
            <p>
                <span>date</span>
                <span>
                    {formatDateV2(bookingDetail.date)}
                </span>
            </p>

            <p>
                <span>time</span>
                <span>{bookingDetail?.time}</span>
            </p>
            <p>
                <span>studio</span>
                <span>{bookingDetail.place.name}</span>
            </p>

            <p>
                <span>studio location</span>
                <span>{bookingDetail?.location?.address}</span>
            </p>

            <p>
                <span>style preferences</span>
                <span>{bookingDetail.selected_styles.map(style => style.name).join(', ')}</span>
            </p>
            
            <p>
                <span>class</span>
                <span>{bookingDetail.class?.name}</span>
            </p>

            <p>
                <span>selected age group</span>
                <span>{bookingDetail.age_group?.name}</span>
            </p>

            <p>
                <span>status</span>
                <span>{bookingDetail.status}</span>
            </p>

            <Divider />

            <p className={styles.header_min}>
                {bookingDetail.is_for_child === false ? 'student' : 'parent'} information</p>

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

            {
                bookingDetail.is_for_child === false && userDetails?.is_owner === true &&
                <p>
                    <span>age</span>
                    <span>{bookingDetail.age}</span>
                </p>
            }

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
                        <span>age</span>
                        <span>{bookingDetail.age}</span>
                    </p>

                    <p>
                        <span>email</span>
                        <span>{bookingDetail.child_email}</span>
                    </p>
                    
                    {
                        bookingDetail.child_phone_number && bookingDetail.child_phone_number.length > 0 &&
                        <p>
                            <span>phone number</span>
                            <span>{bookingDetail.child_phone_number}</span>
                        </p>
                    }
                </>
                :
                <></>
            }

            <Divider />
            
            <p className={styles.header_min}>terms agreement</p>

            <p>
                <span>agreed to health declaration and other document(s)</span>
                <span>{bookingDetail.agreed_to_health_declaration === true ? 'yes' : 'no'}</span>
            </p>

            <p>
                <span>agreed to liability waiver</span>
                <span>{bookingDetail.agreed_to_liability_waiver === true ? 'yes' : 'no'}</span>
            </p>


            {
                bookingDetail.status === 'pending' &&
                <section className={styles.actions__Wrap}>
                    <Button 
                        label={
                            loading ? 
                                'updating...' 
                            :
                            'cancel'
                        }
                        icon={<IoClose size={'1rem'} />}
                        style={{
                            width: 'max-content',
                            marginTop: '2rem',
                            fontSize: '0.75rem',
                            backgroundColor: 'transparent',
                            color: 'var(--primary-app-color)',
                            border: '1px solid var(--primary-app-color)',
                        }}
                        handleClick={
                            () => handleCancelBooking()
                        }
                        disabled={loading}
                    />

                    {
                        (userDetails?.is_admin === true || userDetails?.is_owner === true) &&                    
                        <Button 
                            label={
                                loading ? 
                                    'updating...' 
                                :
                                'confirm'
                            }
                            icon={<IoCheckmark size={'1rem'} />}
                            style={{
                                width: 'max-content',
                                marginTop: '2rem',
                                fontSize: '0.75rem',
                                backgroundColor: 'var(--primary-app-color)',
                            }}
                            handleClick={
                                () => handleConfirmBooking()
                            }
                            disabled={loading}
                        />
                    }
                </section>
            }

            {
                bookingDetail.status === 'confirmed' && bookingDetail.email === userDetails?.email &&
                <>
                    <Button 
                        label={'rate studio'}
                        style={{
                            width: 'max-content',
                            marginTop: '2rem',
                            marginRight: 'auto',
                            fontSize: '0.75rem',
                            backgroundColor: 'var(--primary-app-color)',
                        }}
                        handleClick={() => router.push(`/places/${bookingDetail.place.id}?review=true`)}
                    /> 
                </>
            }
        </section>
    )   
}

export default SingleBookingDetailContent