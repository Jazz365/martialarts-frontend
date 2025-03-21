'use client';

import { useUserContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function useAccessGuard({
    allowOwners=false, 
    allowStudents=false,
}: {
    allowOwners?: boolean;
    allowStudents?: boolean;
}) {
    const { userDetailsLoading, userDetails } = useUserContext();
    const router = useRouter();

    useEffect(() => {
        if (userDetailsLoading || userDetails?.is_admin === true) return;

        if (!userDetails) return router.push('/');

        if (userDetails.is_owner === true && allowOwners === false) return router.back();

        if (allowStudents === false && userDetails.is_owner == false) return router.back();

    }, [userDetailsLoading, userDetails, allowOwners, allowStudents])
}