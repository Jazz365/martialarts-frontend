'use client';


import Loader from '@/components/loaders/Loader/Loader'
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'sonner';

const SubscriptionCallbackDetails = ({
    type,
    userId,
}: {
    type?: string;
    userId?: number;
}) => {
    const router = useRouter();

    useEffect(() => {
        if (type?.toLocaleLowerCase() === 'success') toast.success('Successfully subscribed to plan!');

        router.push('/dashboard/owner/subscription');
    }, [])

    return (
        <section style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100dvh',
        }}>
            <Loader />
        </section>
    )
}

export default SubscriptionCallbackDetails;