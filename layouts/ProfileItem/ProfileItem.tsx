'use client';


import { useUserContext } from '@/contexts/UserContext'
import React, { useState } from 'react'
import Avatar from 'react-avatar';
import styles from './styles.module.css'
import { HiDotsHorizontal } from 'react-icons/hi';
import { AuthService } from '@/services/authService';
import { AppConstants } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/contexts/AppContext';


const ProfileItem = () => {
    const { 
        userDetails, 
        setIsLoggedIn, 
        setUserDetails
    } = useUserContext();
    const { resetUserInfoInContext } = useAppContext();
    const [ showProfileMenu, setShowProfileMenu ] = useState<boolean>(false);

    const router = useRouter();
    
    const authService = new AuthService();

    const handleLogout = async () => {
        // await authService.logoutUser();

        setIsLoggedIn(false);
        setUserDetails(null);

        resetUserInfoInContext();
        
        localStorage.removeItem(AppConstants.tokenKey);
        router.push('/auth/login');
    }

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

            {
                showProfileMenu && <ul className={styles.menu}>
                    <li onClick={handleLogout}>logout</li>
                </ul>
            }
            <HiDotsHorizontal
                size={'1.2rem'}
                style={{
                    cursor: 'pointer'
                }}
                onClick={() => setShowProfileMenu(!showProfileMenu)}
            />
        </section>
    )
}

export default ProfileItem