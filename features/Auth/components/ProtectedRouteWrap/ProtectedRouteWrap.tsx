'use client';

import { useUserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const ProtectedRouteWrap = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const { userDetails, userDetailsLoading, isLoggedIn } = useUserContext();
    const router = useRouter();
    
    useEffect(() => {
        if (userDetailsLoading || userDetails || isLoggedIn) return;

        if (!userDetails) return router.push('/auth/login');  
    }, [userDetails, userDetailsLoading, isLoggedIn])

    return (
        <>{children}</>
    )
}

export default ProtectedRouteWrap