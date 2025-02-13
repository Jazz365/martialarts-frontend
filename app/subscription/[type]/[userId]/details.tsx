'use client';


import Loader from '@/components/loaders/Loader/Loader'
import { useUserContext } from '@/contexts/UserContext';
import { UserService } from '@/services/userService';
import { AppConstants } from '@/utils/constants';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';

const SubscriptionCallbackDetails = ({
    type,
    userId,
}: {
    type?: string;
    userId?: number;
}) => {
    const router = useRouter();
    const userService = new UserService();
    const [ dataLoading, setDataLoading ] = useState(false);
    const {
        userDetails,
    } = useUserContext()

    useEffect(() => {
        const authToken = AppConstants.savedToken;

        if (!authToken || !type || !userDetails) return;

        const activateSubscription = async () => {
            if (dataLoading) return;

            try {
                if (type.toLocaleLowerCase() === 'success') {
                    setDataLoading(true);

                    await userService.activateSubscription(authToken);
                    toast.success('Successfully subscribed to plan!');
                }
            } catch (error) {
                console.log(error);
            } finally {
                setDataLoading(false);
                router.push('/dashboard/owner/subscription');
            }
        }

        activateSubscription();
    }, [type, userDetails])

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