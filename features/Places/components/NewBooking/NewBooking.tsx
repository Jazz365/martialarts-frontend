'use client';


import Button from '@/components/buttons/Button/Button';
import React, { useState } from 'react'
import Calendar from 'react-calendar';
import styles from './styles.module.css';
import useMobile from '@/hooks/useMobile';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUserContext } from '@/contexts/UserContext';
import { publicUserTypes } from '@/features/Auth/components/UserTypeSelect/utils';
import { usePlaceContext } from '@/contexts/PlaceContext';


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const NewBooking = ({
    place,
}: {
    place: IPlace;
}) => {
    const {
        userDetails,
        userDetailsLoading,
    } = useUserContext();

    const {
        setSelectedPlaceId,
    } = usePlaceContext();

    const searchParams = useSearchParams();

    const [value, onChange] = useState<Value>(new Date());
    const isMobile = useMobile();
    const router = useRouter();
    
    const handleBookNowBtnClick = () => {
        if (!userDetails) return router.push(`/auth/register?type=${publicUserTypes.user}&next=${encodeURIComponent(`/places/${place.id}`)}`);

        const newSearchParams = new URLSearchParams(searchParams.toString());
        if (value) newSearchParams.append('booking-date', value.toLocaleString());
        // router.push(`?${newSearchParams.toString()}`);

        setSelectedPlaceId(place.id);
    }

    const getDayName = (date: Date) => {
        const options: Intl.DateTimeFormatOptions = { weekday: 'long' };
        return date.toLocaleString('en-US', options).toLowerCase(); // 'monday', 'tuesday', etc.
    };
    
    const tileClassName = ({ date }: { date: Date }) => {
        const dayName = getDayName(date);
        const openDaysForPlace = place.place_activity_hours.flatMap(item => item.opening_time && item?.opening_time?.length > 0 && item.closing_time && item?.closing_time?.length > 0 ? [item.day.toLocaleLowerCase()] : []);

        const todayAtMid = new Date();
        todayAtMid.setHours(0, 0, 0, 0);

        if (openDaysForPlace.includes(dayName) && date > todayAtMid) {
            return styles.open__Day;
        }

        return styles.disabled__Day;
    };

    return (
        <section className={styles.content__Wrap}>
            <h3 className={styles.title}>ready to start?</h3>

            <section className={styles.date__wrap}>
                <p>available dates</p>

                <Calendar 
                    onChange={onChange} 
                    value={value} 
                    minDate={new Date()}
                    className={styles.calendar}
                    navigationLabel={({ date, label, locale, view }) => {
                        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };

                        return <span className={styles.navigation__Label}>
                            {
                                isMobile ?
                                    <>{date.toLocaleString(locale, options)}</>
                                :
                                <>{label.toLocaleString()}</>
                            }
                        </span>
                    }}
                    tileClassName={tileClassName}
                />
            </section>

            <Button 
                label={userDetailsLoading ? 'please wait...' : 'class registration'}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--red-color)',
                }}
                hoverStyle={{
                    backgroundColor: 'black',
                }}
                handleClick={handleBookNowBtnClick}
                disabled={userDetailsLoading}
            />
        </section>
    )
}

export default NewBooking