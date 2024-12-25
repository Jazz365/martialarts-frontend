'use client';

import Image from 'next/image'
import React, { CSSProperties, Suspense, useRef, useState } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import { IoAddOutline, IoCloseOutline, IoGridOutline } from 'react-icons/io5'
import Button from '../../components/Button/Button'
import CategorySearchBar from '../../components/CategorySearchBar/CategorySearchBar'
import { useUserContext } from '@/contexts/UserContext'
import ProfileItem from '../ProfileItem/ProfileItem';
import { generateDashLinkForUser } from '@/helpers/helpers';
import { userTypes } from '@/features/Auth/components/UserTypeSelect/utils';
import useMobile from '@/hooks/useMobile';
import { RxHamburgerMenu } from "react-icons/rx";
import useClickOutside from '@/hooks/useClickOutside';


const NavigationBar = ({
    showSearchBar=false,
    wrapperStyle={},
    className
}: {
    showSearchBar?: boolean;
    wrapperStyle?: CSSProperties;
    className?: string;
}) => {
    const { userDetails, userDetailsLoading } = useUserContext();
    const [ showMobileMenu, setShowMobileMenu ] = useState(false);
    const isMobile = useMobile();

    const actionsRef = useRef<HTMLDivElement>(null);

    useClickOutside({
        elemRef: actionsRef,
        handleClickOutside: () => setShowMobileMenu(false),
    });

    return <>
        <nav 
            className={`${styles.nav__Wrapper} ${className ?? ''}`}
            style={wrapperStyle}
        >
            <Link 
                href={'/'}
            >
                <Image 
                    src={'/logo-new.png'}
                    alt='logo'
                    width={180}
                    height={25}
                    className={styles.logo}
                    priority
                />
            </Link>

            {
                showSearchBar && !isMobile &&
                <CategorySearchBar
                    hideTrendingStyles={true}
                    wrapperStyle={{
                        width: '35%',
                    }}
                    searchBarStyle={{
                        padding: '0.75rem 0.75rem 0.75rem 1.5rem',
                        width: '100%',
                    }}
                />
            }

            {
                isMobile &&
                <>
                    {
                        showMobileMenu ?
                            <IoCloseOutline
                                size={'1.2rem'}
                                cursor={'pointer'}
                                onClick={() => setShowMobileMenu(!showMobileMenu)}
                            />
                        :
                        <RxHamburgerMenu
                            size={'1.2rem'}
                            cursor={'pointer'}
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                        />
                    }
                </>
            }

            <section 
                className={`${styles.nav__Actions} ${isMobile ? styles.mobile : ''} ${isMobile && showMobileMenu ? styles.show : ''}`}
                ref={actionsRef}
            >
                <Suspense fallback={<>Loading...</>}>
                    {
                        userDetailsLoading ? 
                            <>Loading...</>
                        :
                        userDetails ?
                            <Button 
                                label='dashboard'
                                useLink={true}
                                icon={
                                    <IoGridOutline
                                        color='#fff'
                                        size='1.1rem'
                                    />
                                }
                                linkLocation={generateDashLinkForUser(userDetails.is_owner)}
                            />
                        :
                        <>
                            <Button 
                                label='login'
                                style={{
                                    backgroundColor: 'transparent',
                                    color: '#000',
                                    fontWeight: '500',
                                    padding: 0
                                }}
                                useLink={true}
                                linkLocation='/auth/login'
                            />
                        
                            <Button 
                                label='boost your studio'
                                icon={
                                    <IoAddOutline 
                                        color='#fff'
                                        size='1.1rem'
                                    />
                                }
                                useLink={true}
                                linkLocation={
                                    `/auth/register?type=${userTypes.owner}`
                                }
                            />
                        </>
                    }
                </Suspense>
            </section>
        </nav>
    </>
}

export default NavigationBar