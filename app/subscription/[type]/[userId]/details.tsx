'use client';


import { SAVED_PLACE_DETAIL_IN_STORAGE } from '@/app/dashboard/owner/studios/add-studio/utils';
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
        let savedPlace: number | null = null;
        // const savedPlace = localStorage.getItem(SAVED_PLACE_DETAIL_IN_STORAGE);
        
        if (!authToken || !type || !userDetails) return;

        const activateSubscription = async () => {
            if (dataLoading) return;

            try {
                if (type.toLocaleLowerCase() === 'success') {
                    setDataLoading(true);

                    const res = await userService.activateSubscription(authToken);
                    savedPlace = res?.most_recent_published_id as number;
                    toast.success(`Successfully subscribed to plan!${res?.message ?? ''}`);
                } else {
                    toast.error('Failed to activate subscription, please contact support if you were debited');
                }
            } catch (error) {
                console.log(error);
            } finally {
                setDataLoading(false);
                router.push(`/dashboard/owner/${savedPlace ? '/studios/add-studio' : 'subscription'}`);
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