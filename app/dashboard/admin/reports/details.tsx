'use client';


import { AdminService } from '@/services/adminService';
import { AppConstants } from '@/utils/constants';
import React, { useEffect } from 'react'

const ReportsDetails = () => {
    // useEffect(() => {
    //     const savedToken = AppConstants.savedToken;
    //     const adminService = new AdminService();

    //     adminService.getPlacesReport(savedToken ?? '', '?type=visits&start_date=2024-01-01&end_date=2024-03-31').then(res => {
    //         console.log(res);
    //     }).catch(() => {})
    // }, [])
    return (
        <div>ReportsDetails</div>
    )
}

export default ReportsDetails;