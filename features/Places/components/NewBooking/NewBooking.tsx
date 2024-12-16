'use client';


import Button from '@/components/Button/Button';
import React, { useState } from 'react'
import Calendar from 'react-calendar';
import styles from './styles.module.css';


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const NewBooking = ({
    place,
}: {
    place: IPlace;
}) => {
    const [value, onChange] = useState<Value>(new Date());

    return (
        <section className={styles.content__Wrap}>
            <h3 className={styles.title}>select your date</h3>

            <section className={styles.date__wrap}>
                <p>available dates</p>

                <Calendar 
                    onChange={onChange} 
                    value={value} 
                    minDate={new Date()}
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