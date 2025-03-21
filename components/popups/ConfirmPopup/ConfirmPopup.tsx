'use client'


import React from 'react'
import styles from './styles.module.css'
import { IoCheckmark, IoClose, IoWarningOutline } from 'react-icons/io5'
import Button from '@/components/buttons/Button/Button';


const ConfirmPopup = ({
    warningText='are you sure you want to perform this action?',
    isLoading=false,
    handleCancelBtnClick=()=>{},
    handleConfirmBtnClick=()=>{},
}: {
    warningText?: string;
    isLoading?: boolean;
    handleCancelBtnClick?: () => void;
    handleConfirmBtnClick?: () => void;
}) => {
    return (
        <section className={styles.overlay}>
            <section className={styles.popup}>
                <IoWarningOutline size={'6rem'} color='var(--red-color)' />

                <h3 className={styles.header}>{warningText}</h3>

                <section className={styles.confirm__Mod__Actions}>
                    <Button
                        label={
                            isLoading ? 
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
                            () => handleCancelBtnClick()
                        }
                        disabled={isLoading}
                    />

                    <Button
                        label={
                            isLoading ? 
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
                            () => handleConfirmBtnClick()
                        }
                        disabled={isLoading}
                    />
                </section>
            </section>
        </section>
    )
}

export default ConfirmPopup