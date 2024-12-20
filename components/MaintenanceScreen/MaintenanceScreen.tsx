'use client';


import React, { useEffect, useState } from 'react'
import maintenanceImg from '../../assets/maintenance.jpg'
import Image from 'next/image'
import styles from './styles.module.css'
import { IoClose } from 'react-icons/io5';
import happyIllustration from '../../assets/happy.svg'

const MaintenanceScreen = () => {
    const [ showPopup, setShowPopup ] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 1200);

        return () => clearTimeout(timer);
    }, [])

    return (
        <section className={styles.content}>
            <Image 
                src={maintenanceImg}
                alt='maintenance illustation'
                width={0}
                height={500}
            />

            {
                showPopup && <section className={styles.overlay}>
                    <section className={styles.popup}>
                        <IoClose 
                            cursor={'pointer'} 
                            onClick={() => setShowPopup(false)}
                            size={'1.4rem'}
                            style={{
                                marginLeft: 'auto',
                            }}
                        />

                        <Image 
                            src={happyIllustration}
                            alt='happy'
                            width={0}
                            height={150}
                            className={styles.illus}
                        />
                        
                        <section className={styles.info}>
                            <h2 className={styles.header}>Thanks For Visiting Martialarts.guru!</h2>
                            <p>We are working hard to improve the site and enhance your experience. Please check back soon!</p>
                        </section>
                    </section>
                </section>
            }
        </section>
    )
}

export default MaintenanceScreen