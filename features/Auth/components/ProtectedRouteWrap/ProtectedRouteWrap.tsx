'use client';

import { useUserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const ProtectedRouteWrap = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const { userDetails, userDetailsLoading } = useUserContext();
    const router = useRouter();
    
    useEffect(() => {
        if (userDetailsLoading || userDetails) return;

        if (!userDetails) return router.push('/auth/login');    
    }, [userDetails, userDetailsLoading])

    return (
        <>{children}</>
    )
}

export default ProtectedRouteWrap