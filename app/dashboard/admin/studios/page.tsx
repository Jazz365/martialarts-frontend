import { Metadata } from 'next'
import React from 'react'
import styles from './styles.module.css'
import AllStudiosDetail from './details'
import { generateDashLinkForUser } from '@/helpers/helpers'
import { IoAddOutline } from 'react-icons/io5'
import Button from '@/components/buttons/Button/Button'

export const metadata: Metadata = {
    title: 'Studios | Dashboard'
}


const StudiosListingPage = () => {
    return (
        <section className={styles.content__Wrap}>
            <section className={styles.header__Wrap}>
                <h1 className={styles.header}>Studios</h1>

                <Button
                    label={'add'}
                    icon={
                        <IoAddOutline
                            size={'1.1rem'}
                        />
                    }
                    useLink={true}
                    linkLocation={`${generateDashLinkForUser({ isAdmin: true })}/studios/add-studio`}
                    style={{
                        backgroundColor: 'var(--primary-app-color)'
                    }}
                />
            </section>

            <AllStudiosDetail />
        </section>
    )
}

export default StudiosListingPage