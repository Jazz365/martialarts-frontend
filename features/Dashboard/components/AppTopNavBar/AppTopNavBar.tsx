import React from 'react'
import logo from '../../../../assets/FAVICON-plain.png'
import styles from './styles.module.css'
import ProfileItem from '@/layouts/ProfileItem/ProfileItem'
import MemoizedImage from '@/components/common/MemoizedImage/MemoizedImage'


const AppTopNavBar = () => {
    return (
        <section className={styles.nav__Wrap}>
            <MemoizedImage 
                src={logo}
                alt='logo'
                width={40}
                height={40}
                priority
                style={{
                    objectFit: 'cover',
                }}
            />

            <ProfileItem />
        </section>
    )
}

export default AppTopNavBar