'use client';


import { useUserContext } from '@/contexts/UserContext'
import React, { useRef, useState } from 'react'
import Avatar from 'react-avatar';
import styles from './styles.module.css'
import { HiDotsHorizontal } from 'react-icons/hi';
// import { AuthService } from '@/services/authService';
import { AppConstants } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import useMobile from '@/hooks/useMobile';
import useClickOutside from '@/hooks/useClickOutside';
import { SAVED_PLACE_DETAIL_IN_STORAGE } from '@/app/dashboard/[type]/studios/add-studio/utils';
import { useBookingContext } from '@/contexts/BookingContext';
import { usePlaceContext } from '@/contexts/PlaceContext';
import { useAdminDataContext } from '@/contexts/AdminDataContext/AdminDataContext';


const ProfileItem = () => {
    const { 
        userDetails, 
        setIsLoggedIn, 
        setUserDetails,
    } = useUserContext();

    const { 
        resetBookingContext 
    } = useBookingContext();
    
    const { 
        resetPlaceContext 
    } = usePlaceContext();

    const {
        resetAdminDataContext,
    } = useAdminDataContext();

    const [ showProfileMenu, setShowProfileMenu ] = useState<boolean>(false);
    
    const isMobile = useMobile();

    const menuRef = useRef<HTMLUListElement>(null);

    const router = useRouter();
    
    // const authService = new AuthService();

    useClickOutside({
        elemRef: menuRef,
        handleClickOutside: () => setShowProfileMenu(false),
    });
    
    const handleLogout = async () => {
        // await authService.logoutUser();
        router.push('/auth/login');

        setIsLoggedIn(false);
        setUserDetails(null);

        resetPlaceContext();
        resetBookingContext();
        resetAdminDataContext();
        
        localStorage.removeItem(AppConstants.tokenKey);
        localStorage.removeItem(SAVED_PLACE_DETAIL_IN_STORAGE);
    }

    return (
        <section className={styles.profile__Wrap}>
            <section className={styles.user__Info}>
                <Avatar 
                    name={userDetails?.username}
                    round={true}
                    size='2.8rem'
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                />
                
                {
                    isMobile ? <></> 
                    :
                    <p>{userDetails?.username}</p>
                }
            </section>

            {
                showProfileMenu && <ul 
                    className={styles.menu}
                    ref={menuRef}
                >
                    <li onClick={handleLogout}>logout</li>
                </ul>
            }

            {
                isMobile ? <></>
                :
                <HiDotsHorizontal
                    size={'1.2rem'}
                    style={{
                        cursor: 'pointer'
                    }}
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                />
            }
        </section>
    )
}

export default ProfileItem