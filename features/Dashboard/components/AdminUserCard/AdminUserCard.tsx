'use client';


import React, { memo } from 'react'
import Avatar from 'react-avatar';
// import { HiOutlineDotsVertical } from 'react-icons/hi';
import styles from './styles.module.css'
import useMobile from '@/hooks/useMobile';


const AdminUserCard = memo(({
    user
}: {
    user: IUser;
}) => {
    const isMobile = useMobile();
    return (
        <section className={styles.user__Card}>
            {/* <HiOutlineDotsVertical className={styles.menu__Icon} /> */}

            <Avatar 
                name={user.username}
                round={true}
                className={styles.user__Avatar}
                size={
                    isMobile ?
                        '4rem'
                    :
                    '6rem'   
                }
            />

            <section className={styles.user__Detail}>
                <section className={styles.detail__Item__Wrap}>
                    <p className={styles.detail__Title}>username</p>
                    <p className={styles.detail__Info}>{user.username}</p>
                </section>

                <section className={styles.detail__Item__Wrap}>
                    <p className={styles.detail__Title}>email</p>
                    <p className={styles.detail__Info}>{user.email}</p>
                </section>
                
                <section className={styles.detail__Item__Wrap}>
                    <p className={styles.detail__Title}>user type</p>
                    <p className={styles.detail__Info}>
                        {
                            user.is_admin === true ?
                                'admin'
                            :
                            user.is_owner === true ?
                                'owner'
                            :
                            'student'
                        }
                    </p>
                </section>
            </section>
        </section>
    )
})

export default AdminUserCard;