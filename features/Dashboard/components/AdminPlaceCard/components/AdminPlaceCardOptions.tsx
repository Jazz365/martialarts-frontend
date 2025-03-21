'use client'


import React, { useState } from 'react'
import styles from '../styles.module.css'
import { IoEyeOutline } from 'react-icons/io5'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { RxCross1, RxUpdate } from 'react-icons/rx'
import { generateDashLinkForUser } from '@/helpers/helpers'
import { FiEdit } from "react-icons/fi";
import { RiCheckDoubleFill } from 'react-icons/ri'
import { HiOutlineArchiveBoxArrowDown } from 'react-icons/hi2'
import { AdminService } from '@/services/adminService'
import { AppConstants } from '@/utils/constants'
import { toast } from 'sonner'
import CircularLoader from '@/components/loaders/CircularLoader/CircularLoader'
import { useAdminDataContext } from '@/contexts/AdminDataContext/AdminDataContext'
import ConfirmPopup from '@/components/popups/ConfirmPopup/ConfirmPopup'

const AdminPlaceCardOptions = ({
    ref,
    placeId,
    placeName,
    placeIsFeatured=false,
    updatePlaceFeaturedStatus=()=>{},
    status,
    updatePlaceStatus=()=>{},
}: {
    ref?: React.RefObject<HTMLUListElement>;
    placeId: number;
    placeName: string;
    placeIsFeatured: boolean;
    updatePlaceFeaturedStatus?: (val: boolean) => void;
    status: keyof typeof IPlaceStatus;
    updatePlaceStatus?: (val: keyof typeof IPlaceStatus) => void;
}) => {
    const [
        linkToViewPlace,
        linkToEditPlace,
    ] = [
        `/places/${placeId}`,
        `${generateDashLinkForUser({ isAdmin: true })}/studios/add-studio?id=${placeId}`,
    ];

    const {
        placesToDisplay,
        setPlaces,
    } = useAdminDataContext();

    const [ isUpdating, setIsUpdating ] = useState(false);
    const [ showConfirmationModal, setShowConfirmationModal ] = useState(false);

    const router = useRouter();

    const adminService = new AdminService();

    const handleAsyncAdminOperation = async (
        adminOperation: () => Promise<void>,
        successMessage: string
    ) => {
        setIsUpdating(true);

        try {
            await adminOperation(); 
            setIsUpdating(false);

            toast.success(successMessage);
        } catch (error) {
            setIsUpdating(false);
            toast.error('Something went wrong while trying to perform operation, please try again later');
        }
    };

    const handleTogglePlaceFeatureStatus = async () => {
        const savedToken = AppConstants.savedToken;
        if (isUpdating || !savedToken) return;

        const featureUpdateType = placeIsFeatured === true ? 'unfeature' : 'feature';

        await handleAsyncAdminOperation(
            async () => {
                try {
                    await adminService.updatePlaceFeaturedStatus(savedToken, placeId, featureUpdateType);
                    updatePlaceFeaturedStatus(!placeIsFeatured);
                } catch (error) {
                    throw error;
                }
            },
            `Successfully ${featureUpdateType}d place!`,
        );
    }

    const handlePublishPlace = async () => {
        const savedToken = AppConstants.savedToken;
        if (isUpdating || !savedToken) return;
    
        await handleAsyncAdminOperation(
            async () => {
                try {
                    await adminService.approvePlace(savedToken, placeId);
                    updatePlaceStatus('published');
                } catch (error) {
                    throw error;
                }
            },
            `Successfully published place!`,
        )
    }

    const handleArchivePlace = async () => {
        const savedToken = AppConstants.savedToken;
        if (isUpdating || !savedToken) return;

        await handleAsyncAdminOperation(
            async () => {
                try {
                    await adminService.archivePlace(savedToken, placeId);
                    updatePlaceStatus('archived');
                } catch (error) {
                    throw error;
                }
            },
            `Successfully archived place!`,
        );
    }

    const handleDeletePlace = async () => {
        const savedToken = AppConstants.savedToken;
        if (isUpdating || !savedToken) return;

        await handleAsyncAdminOperation(
            async () => {
                try {
                    await adminService.deletePlace(savedToken, placeId);
                    setShowConfirmationModal(false);
                    setPlaces(placesToDisplay.filter(place => place.id !== placeId));
                } catch (error) {
                    throw error;
                }
            },
            `Successfully deleted place!`,
        );
    }

    return <>
        <ul className={styles.admin__Place__Card__Options} ref={ref}>
            {
                status === 'published' &&
                <li onClick={() => router.push(linkToViewPlace)}>
                    <IoEyeOutline />
                    <Link href={linkToViewPlace}>view</Link>
                </li>
            }

            <li onClick={() => router.push(linkToEditPlace)}>
                <FiEdit />
                <Link href={linkToEditPlace}>edit</Link>
            </li>

            {
                status === 'published' &&
                <li onClick={() => handleTogglePlaceFeatureStatus()}>
                    <RxUpdate />
                    <span>{placeIsFeatured ? 'unfeature' : 'feature'}</span>
                </li>
            }

            {
                (status === 'draft' || status === 'archived') &&
                <li onClick={() => handlePublishPlace()}>
                    <RiCheckDoubleFill />
                    <span>publish</span>
                </li>
            }

            {
                status === 'published' &&
                <li onClick={() => handleArchivePlace()}>
                    <HiOutlineArchiveBoxArrowDown />
                    <span>archive</span>
                </li>
            }
            
            <li onClick={() => setShowConfirmationModal(true)}>
                <RxCross1 />
                <span>delete</span>
            </li>

            {
                isUpdating && <section className={styles.loader__Overlay}>
                    <CircularLoader size='2rem' />
                </section>
            }
        </ul>

        {
            showConfirmationModal &&
            <ConfirmPopup 
                warningText={`Are you sure you want to delete this place titled: '${placeName}'?`}
                isLoading={isUpdating}
                handleCancelBtnClick={() => setShowConfirmationModal(false)}
                handleConfirmBtnClick={() => handleDeletePlace()}
            />
        }
    </>
}

export default AdminPlaceCardOptions