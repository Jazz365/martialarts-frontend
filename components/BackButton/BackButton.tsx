'use client';


import React from 'react'
import Button from '../Button/Button'
import { IoArrowBackOutline } from 'react-icons/io5'
import { useRouter } from 'next/navigation'

const BackButton = () => {
    const router = useRouter();

    return <Button
        label='back'
        icon={
            <IoArrowBackOutline />
        }
        style={{
            padding: 0,
            background: 'transparent',
            color: '#000',
        }}
        handleClick={() => router.back()}
    />
}

export default BackButton