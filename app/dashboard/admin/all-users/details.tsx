'use client'


import SearchBar from '@/components/inputs/SearchBar/SearchBar';
import PageLoader from '@/components/loaders/PageLoader/PageLoader';
import { useAdminDataContext } from '@/contexts/AdminDataContext/AdminDataContext'
import AdminUserCard from '@/features/Dashboard/components/AdminUserCard/AdminUserCard';
import React, { useEffect, useMemo, useState } from 'react'
import styles from './styles.module.css'
import SingleResultViewOption from '@/features/Search/components/ResultsViewOption/SingleResultViewOption';
import Button from '@/components/buttons/Button/Button';
import { userTypes } from '@/features/Auth/components/UserTypeSelect/utils';
import { v4 as uuidv4 } from 'uuid';
import { blurFocusFromCurrentPage } from '@/helpers/helpers';

const AllUsersDetails = () => {
    const {
        users,
        usersLoading,
    } = useAdminDataContext();

    const [ searchValue, setSearchValue ] = useState('');
    const [ activeTypeFilter, setActiveTypeFilter ] = useState('');

    const usersToShow = useMemo(() => {
        return users.filter(user => {
            if (searchValue.length > 0) {
                return (
                    user.email.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()) ||
                    user.username.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
                )
            }
            return true;
        }).filter(user => {
            if (activeTypeFilter.length > 0) {
                if (activeTypeFilter === userTypes.admin) return user.is_admin === true;
                if (activeTypeFilter === userTypes.owner) return user.is_owner === true;

                return user.is_admin !== true && user.is_owner !== true;
            }
            return true;
        });
    }, [users, searchValue, activeTypeFilter]);

    useEffect(() => {
        blurFocusFromCurrentPage();
    }, [])
    
    return (
        <section className={styles.content__Wrap}>
            <section className={styles.header__Wrap}>
                <SearchBar 
                    value={searchValue}
                    onChange={(_name: string, val: string) => setSearchValue(val)}
                    style={{
                        width: 'max-content',
                        fontSize: '0.8rem',
                        padding: '0.5rem 0.8rem'
                    }}
                    placeholder='Search by username or email'
                />

                <section className={styles.filter__Wrap}>
                    <SingleResultViewOption>
                        {
                            React.Children.toArray(
                                [
                                    <Button
                                        label={'All'}
                                        style={{
                                            border: activeTypeFilter === '' ? 
                                            '1px solid #000'
                                            :
                                            '',
                                            fontSize: '0.75rem',
                                            padding: '0.55rem 1rem',
                                            color: activeTypeFilter === '' ? 
                                            '#000'
                                            :
                                            '#808080',
                                            backgroundColor: activeTypeFilter === '' ?
                                                '#fff'
                                            :
                                            'transparent',
                                            transition: '0.25s ease-in-out',
                                            boxShadow: activeTypeFilter === '' ?
                                                'var(--card-box-shadow)'
                                            :
                                            '',
                                        }}
                                        handleClick={
                                            () => setActiveTypeFilter('')
                                        }
                                        key={uuidv4()}
                                    />,
                                    ...Object.keys(userTypes).map(type => {
                                        return <Button
                                            label={
                                                type === userTypes.admin ?
                                                    type :
                                                `${type}s`
                                            }
                                            style={{
                                                border: activeTypeFilter === type ? 
                                                '1px solid #000'
                                                :
                                                '',
                                                fontSize: '0.75rem',
                                                padding: '0.55rem 1rem',
                                                color: activeTypeFilter === type ? 
                                                '#000'
                                                :
                                                '#808080',
                                                backgroundColor: activeTypeFilter === type ?
                                                    '#fff'
                                                :
                                                'transparent',
                                                transition: '0.25s ease-in-out',
                                                boxShadow: activeTypeFilter === type ?
                                                    'var(--card-box-shadow)'
                                                :
                                                '',
                                            }}
                                            handleClick={
                                                () => setActiveTypeFilter(type)
                                            }
                                            key={uuidv4()}
                                        />
                                    })
                                ]
                            )
                        }
                    </SingleResultViewOption>
                </section>
            </section>

            <section className={styles.user__Listing}>
                {
                    usersLoading ?
                        <PageLoader />
                    :
                    React.Children.toArray(usersToShow.map(user => {
                        return <AdminUserCard 
                            key={user.id}
                            user={user}
                        />
                    }))
                }
            </section>
        </section>
    )
}

export default AllUsersDetails;