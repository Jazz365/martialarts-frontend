'use client';


import Button from '@/components/Button/Button';
import React, { useState } from 'react'
import Calendar from 'react-calendar';
import styles from './styles.module.css';
import useMobile from '@/hooks/useMobile';


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const NewBooking = ({
    place,
}: {
    place: IPlace;
}) => {
    const [value, onChange] = useState<Value>(new Date());
    const isMobile = useMobile();

    return (
        <section className={styles.content__Wrap}>
            <h3 className={styles.title}>select your date</h3>

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
                />
            </section>

            <Button 
                label='book now'
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            />
        </section>
    )
}

export default NewBooking