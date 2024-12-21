'use client';

import Image from 'next/image'
import React, { CSSProperties, Suspense } from 'react'
import styles from './styles.module.css'
import Link from 'next/link'
import { IoAddOutline, IoGridOutline } from 'react-icons/io5'
import Button from '../../components/Button/Button'
import CategorySearchBar from '../../components/CategorySearchBar/CategorySearchBar'
import { useUserContext } from '@/contexts/UserContext'
import ProfileItem from '../ProfileItem/ProfileItem';
import { generateDashLinkForUser } from '@/helpers/helpers';
import { userTypes } from '@/features/Auth/components/UserTypeSelect/utils';


const NavigationBar = ({
    showSearchBar=false,
    wrapperStyle={},
}: {
    showSearchBar?: boolean;
    wrapperStyle?: CSSProperties;
}) => {
    const { userDetails, userDetailsLoading } = useUserContext();

    return <>
        <nav 
            className={styles.nav__Wrapper}
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
                showSearchBar &&
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

            <section className={styles.nav__Actions}>
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