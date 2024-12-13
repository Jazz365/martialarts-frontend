'use client';


import { useUserContext } from '@/contexts/UserContext'
import React, { useState } from 'react'
import Avatar from 'react-avatar';
import styles from './styles.module.css'
import { HiDotsHorizontal } from 'react-icons/hi';


const ProfileItem = () => {
    const { userDetails } = useUserContext();
    const [ showProfileMenu, setShowProfileMenu ] = useState<boolean>(false);

    return (
        <section className={styles.profile__Wrap}>
            <section className={styles.user__Info}>
                <Avatar 
                    name={userDetails?.username}
                    round={true}
                    size='2.8rem'
                />
                
                <p>{userDetails?.username}</p>
            </section>

            <HiDotsHorizontal
                size={'1.2rem'}
                style={{
                    cursor: 'pointer'
                }}
            />
        </section>
    )
}

export default ProfileItem