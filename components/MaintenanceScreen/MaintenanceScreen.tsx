'use client';


import React, { useEffect, useState } from 'react'
import maintenanceImg from '../../assets/maintenance.jpg'
import Image from 'next/image'
import styles from './styles.module.css'
import { IoClose } from 'react-icons/io5';
import astronaut from '../../assets/astr.png'

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
                src={'/logo-new.png'}
                alt='logo'
                width={180}
                height={25}
                className={styles.logo}
                priority
            />

            <Image 
                src={maintenanceImg}
                alt='maintenance illustation'
                width={0}
                height={500}
                className={styles.main__Ilus}
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
                            src={astronaut}
                            alt='happy'
                            width={0}
                            height={150}
                            className={styles.illus}
                        />
                        
                        <section className={styles.info}>
                            <h2 className={styles.header}>Thanks For Visiting Martialarts.guru!</h2>
                            <p>We are constantly improving the site</p>
                        </section>
                    </section>
                </section>
            }
        </section>
    )
}

export default MaintenanceScreen