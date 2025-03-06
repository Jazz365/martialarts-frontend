'use client';

import { useUserContext } from '@/contexts/UserContext';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { userTypes } from '../UserTypeSelect/utils';
import { blurFocusFromCurrentPage } from '@/helpers/helpers';

const ProtectedRouteWrap = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const { userDetails, userDetailsLoading, isLoggedIn } = useUserContext();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        blurFocusFromCurrentPage();
    }, [])
    
    useEffect(() => {
        if (userDetailsLoading) return;
        
        if (userDetails && userDetails.is_owner === true) {
            if (pathname.includes(`/${userTypes.user}`)) return router.replace(pathname.replace(`/${userTypes.user}`, `/${userTypes.owner}`));
            if (pathname.includes(`/${userTypes.admin}`)) return router.replace(pathname.replace(`/${userTypes.admin}`, `/${userTypes.owner}`));
        }

        if (userDetails && userDetails.is_admin === true) {
            if (pathname.includes(`/${userTypes.user}`)) return router.replace(pathname.replace(`/${userTypes.user}`, `/${userTypes.admin}`));
            if (pathname.includes(`/${userTypes.owner}`)) return router.replace(pathname.replace(`/${userTypes.owner}`, `/${userTypes.admin}`));
        }

        if (userDetails && userDetails.is_owner === false && userDetails.is_admin === false) {
            if (pathname.includes(`/${userTypes.owner}`)) return router.replace(pathname.replace(`/${userTypes.owner}`, `/${userTypes.user}`));
            if (pathname.includes(`/${userTypes.admin}`)) return router.replace(pathname.replace(`/${userTypes.admin}`, `/${userTypes.user}`));    
        }
        
        if (!userDetails && !isLoggedIn) return router.push('/auth/login');
    }, [userDetails, userDetailsLoading, isLoggedIn, pathname])

    return (
        <>{children}</>
    )
}

export default ProtectedRouteWrap;