'use client';


import { useUserContext } from '@/contexts/UserContext'
import React from 'react'
import styles from './styles.module.css'
import Button from '@/components/buttons/Button/Button';
import { IoAddOutline, IoRefresh, IoSearchOutline } from 'react-icons/io5';
import { generateDashLinkForUser } from '@/helpers/helpers';
import { listingSortOptions, listingViewTypes } from '@/features/Search/sections/Places/utils';
import { useAdminDataContext } from '@/contexts/AdminDataContext/AdminDataContext';


const Greeting = () => {
    const { userDetails } = useUserContext();
    const { 
        dashboardDataLoaded,
        handleTriggerContextReload,
    } = useAdminDataContext();
    
    const handleRefreshData = () => {
        if (!userDetails || userDetails?.is_admin === false || !dashboardDataLoaded) return;

        handleTriggerContextReload();
    }

    return (
        <section className={styles.greeting__Item}>
            <h1 className={styles.title__Text}>
                Welcome back <span className={styles.username}>{userDetails?.username}</span> !
            </h1>

            <Button 
                label={
                    userDetails?.is_admin === true ?
                        !dashboardDataLoaded ?
                            'please wait...'
                        :
                        'refresh'
                    :
                    userDetails?.is_owner === true ?
                        'add studio'
                    :
                    'search studios'
                }
                icon={
                    userDetails?.is_admin === true ?
                        <IoRefresh 
                            size={'1.1rem'}
                        />
                    :
                    userDetails?.is_owner === true ?
                        <IoAddOutline
                            size={'1.1rem'}
                        />
                    :
                    <IoSearchOutline
                        size={'1.1rem'}
                    />
                }
                useLink={userDetails?.is_admin ? false : true}
                linkLocation={
                    userDetails?.is_admin ? 
                        ''
                    :
                    userDetails?.is_owner === true ?
                        `${generateDashLinkForUser({ isOwner: true })}/studios/add-studio`
                    :
                    `/search?view=${listingViewTypes.listView}&sort=${listingSortOptions.sort_by_newest}`
                }
                style={{
                    backgroundColor: 'var(--primary-app-color)',
                    display: (!userDetails) ? 'none' : 'flex',
                }}
                handleClick={handleRefreshData}
            />
        </section>
    )
}

export default Greeting