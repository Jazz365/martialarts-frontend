'use client';


import { useUserContext } from '@/contexts/UserContext'
import React from 'react'
import styles from './styles.module.css'
import Button from '@/components/Button/Button';
import { IoAddOutline } from 'react-icons/io5';
import { generateDashLinkForUser } from '@/helpers/helpers';


const Greeting = () => {
    const { userDetails } = useUserContext();

    return (
        <section className={styles.greeting__Item}>
            <h1 className={styles.title__Text}>
                Welcome back <span className={styles.username}>{userDetails?.username}</span> !
            </h1>

            <Button 
                label={
                    userDetails?.is_owner === true ?
                        'add place'
                    :
                    ''
                }
                icon={
                    <IoAddOutline
                        size={'1.1rem'}
                    />
                }
                useLink={true}
                linkLocation={
                    userDetails?.is_owner === true ?
                        `${generateDashLinkForUser(userDetails.is_owner)}/places/add-place`
                    :
                    ''
                }
            />
        </section>
    )
}

export default Greeting