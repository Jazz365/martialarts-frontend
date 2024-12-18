import SideBar from '@/layouts/SideBar/SideBar';
import ProtectedRouteWrap from '@/features/Auth/components/ProtectedRouteWrap/ProtectedRouteWrap';
import React from 'react'
import styles from './styles.module.css'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dashboard'
}

const DashboardLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {

    return <>
        <ProtectedRouteWrap>
            <section className={styles.dash__Layout}>
                <SideBar />

                <main className={styles.dash__Content}>
                    {children}
                </main>
            </section>
        </ProtectedRouteWrap>
    </>
}

export default DashboardLayout