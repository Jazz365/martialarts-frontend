'use client';


import Loader from '@/components/Loader/Loader';
import { useUserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const LoginSuccess = () => {
  const { userDetails, userDetailsLoading } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (userDetailsLoading) return;
    if (!userDetails) return router.push('/auth/login');

    router.push(`/dashboard/${userDetails.is_owner === true ? 'owner' : 'user'}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetails, userDetailsLoading])

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

export default LoginSuccess;