'use client';

import SelectItem from '@/components/inputs/SelectItem/SelectItem';
import TextInputComponent from '@/components/inputs/TextInputComponent/TextInputComponent'
import AddItemWrapper from '@/features/Dashboard/components/AddItemWrapper/AddItemWrapper'
import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import AddItemComponent from '@/features/Dashboard/components/AddItemComponent/AddItemComponent';
import { cleanNewPlaceDetailForStorageSaveOperation, compulsoryDetailKeys, compulsoryDetailKeysDict, formatSavedNewPlaceDetailInStorage, generateFormDataForNewPlaceDetails, initialNewPlaceDetail, NewPlaceDetail, newPlaceDetailKeysDict, pricingTypes, SAVED_PLACE_DETAIL_IN_STORAGE, saveFormDataToFile } from './utils';
import AddLocationsComponent from '@/features/Dashboard/components/AddLocationsComponent/AddLocationsComponent';
import MastersAddComponent from '@/features/Dashboard/components/MastersAddComponent/MastersAddComponent';
import ActivityHoursEdit from '@/features/Dashboard/components/ActivityHoursEdit/ActivityHoursEdit';
import AddFaqItem from '@/features/Dashboard/components/AddFaqItem/AddFaqItem';
import Button from '@/components/buttons/Button/Button';
import GalleryEditItem from '@/features/Dashboard/components/GalleryEditItem/GalleryEditItem';
import { genderTypes } from '@/utils/genderTypes';
import RequiredIndicator from '@/components/common/RequiredIndicator/RequiredIndicator';
import { toast } from 'sonner';
import { PlaceService } from '@/services/placeService';
import { AppConstants } from '@/utils/constants';
import { useAppContext } from '@/contexts/AppContext/AppContext';
import { useRouter, useSearchParams } from 'next/navigation';
import PageLoader from '@/components/loaders/PageLoader/PageLoader';
import { IoAddOutline } from 'react-icons/io5';
import DocumentsAdd from '@/features/Dashboard/components/DocumentsAdd/DocumentsAdd';
import { blurFocusFromCurrentPage, getAllDaysOfTheWeek, getOrdinalPosition, validateLink } from '@/helpers/helpers';
import { v4 as uuidv4 } from 'uuid';
import AlternatingDotsLoader from '@/components/loaders/AlternatingDotsLoader/AlternatingDotsLoader';
import AddClassSchedule from '@/features/Dashboard/components/AddClassSchedule/AddClassSchedule';
import ProgressBar from '@/components/common/ProgressBar/ProgressBar';
import StyleAddModal from '@/components/popups/StyleAddModal/StyleAddModal';
import { FaCirclePlay } from "react-icons/fa6";
import { usePlaceContext } from '@/contexts/PlaceContext';
import useAccessGuard from '@/hooks/useAccessGuard';
import { AdminService } from '@/services/adminService';
import { useAdminDataContext } from '@/contexts/AdminDataContext/AdminDataContext';
import { useUserContext } from '@/contexts/UserContext';

const daysOfTheWeek = getAllDaysOfTheWeek();
const timeoutToRemoveErrHighlight = 1400;

const AddPlaceDetails = () => {
    const [ details, setDetails ] = useState<NewPlaceDetail>(initialNewPlaceDetail);
    const [ detailsLoading, setDetailsLoading ] = useState<boolean>(false);
    const [ showStyleAddModal, setShowStyleAddModal ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState(false);
    const [ isEditView, setIsEditView ] = useState(false);
    const [ estimatedUploadTimeInMS, setEstimatedUploadTimeInMS ] = useState(6000);
    
    const [
        basicInfoRef,
        galleryRef,
        featuresRef,
        mastersRef,
        activityHoursRef,
        contactRef,
        faqRef,
        classSchedulesRef,
        documentsAddRef,
        buttonRef,
    ] = [
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLDivElement>(null),
        useRef<HTMLElement>(null),
    ];

    const searchParams = useSearchParams();

    const { 
        allStyles,
        stylesLoading,
        placeTypes, 
        catersTo, 
        ageGroups,
        setShowPaymentModal,
    } = useAppContext();

    const {
        userPlaces, 
        setUserPlaces,
    } = usePlaceContext();

    const {
        placesToDisplay,
        setPlaces,
    } = useAdminDataContext();

    const {
        userDetails
    } = useUserContext();

    const router = useRouter();

    const [
        placeService,
        adminService,
    ] = [
        new PlaceService(),
        new AdminService(),
    ];
    
    const isAdminUser = userDetails?.is_admin === true;

    useAccessGuard({ allowOwners: true });

    useEffect(() => {
        blurFocusFromCurrentPage();

        const idPassed = searchParams.get('id');
        if (!idPassed || isNaN(Number(idPassed))) {
            // loadSavedPlaceFromStorage();
            return setIsEditView(false);
        }

        setIsEditView(true);
        setDetailsLoading(true);

        placeService.getSinglePlace(Number(idPassed)).then((res) => {
            const placeActivityHours = res?.place_activity_hours;
            const formattedActivityHours = daysOfTheWeek.map(day => {
                const foundDay = placeActivityHours?.find((activity: IPlaceActivityHours) => activity.day === day);
                return {
                    id: foundDay?.id ?? uuidv4(),
                    day,
                    opening_time: foundDay?.opening_time ?? '',
                    closing_time: foundDay?.closing_time ?? '',
                }
            });

            // console.log('current place ->>', res);
            
            setDetails({
                ...res,
                benefits: res?.benefits?.split('\n'),
                styles: res?.place_styles?.map((item: IMartialArtStyle) => item.id),
                locations: res?.place_locations,
                master_images: res?.master_images_data,
                images: res?.images_data,
                caters_to: res?.place_caters_to?.map((item: ICatersTo) => item.id),
                activity_hours: formattedActivityHours,
                faqs: res?.place_faqs,
                place_policy: res?.place_policy,
                documents: res?.documents_data,
                age_groups: res?.place_age_groups?.map((item: IPlaceAgeGroups) => item.id),
                class_schedules_data: res?.class_schedules_data ?? [],
            });
            setDetailsLoading(false);
        }).catch(() => {
            setDetailsLoading(false);
        })
    }, [searchParams])
    
    const handleDetailUpdate = (
        key: string, 
        value: string | boolean | string[] | number[] | ILocation[] | IPlaceMasterImage[] | IPlaceFaq[] | IPlaceImage[] | IPlaceDocuments[] | IPlaceClassSchedule[]
    ) => {
        setDetails((prevDetails) => {
            if (key === newPlaceDetailKeysDict.place_policy) {
                return {
                    ...prevDetails,
                    place_policy: {
                        content: value as string,
                    },
                }
            };

            return {
                ...prevDetails,
                [key]: value,
            }
        });
    }

    const scrollToSectionAndAddErrHighlight = (sectionRef: React.RefObject<HTMLDivElement>) => {
        sectionRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
        sectionRef.current?.classList.add(styles.highlight__Err);
        setTimeout(() => sectionRef.current?.classList.remove(styles.highlight__Err), timeoutToRemoveErrHighlight);
    }

    const handleUpdateArrayItem = (
        key: keyof NewPlaceDetail, 
        index: number, 
        value: string | File | number | undefined, 
        itemKey: string | null = null,
    ) => {
        setDetails(prevDetails => {
            const updatedDetails = { ...prevDetails };

            if (key === 'locations' || key === 'master_images' || key === 'activity_hours') {
                if (!itemKey) return updatedDetails;

                const updatedItems = [...updatedDetails[key]];
                updatedItems[index] = {
                    ...updatedItems[index],
                    [itemKey]: value,
                };

                if (key === newPlaceDetailKeysDict.locations) updatedDetails.locations = updatedItems as ILocation[];
                if (key === newPlaceDetailKeysDict.master_images) updatedDetails.master_images = updatedItems as IPlaceMasterImage[];
                if (key === newPlaceDetailKeysDict.activity_hours) updatedDetails.activity_hours = updatedItems as IPlaceActivityHours[];

                return updatedDetails;
            }
            
            if (Array.isArray(updatedDetails[key])) {
                updatedDetails[key][index] = value;
                return updatedDetails;
            }

            return updatedDetails;
        });
    }

    const handleUpdateCheckboxItems = (key: keyof NewPlaceDetail, valueId: number, checkedStatus: boolean) => {
        const validkeys = [newPlaceDetailKeysDict.styles, newPlaceDetailKeysDict.caters_to, newPlaceDetailKeysDict.age_groups];

        const currentItem = details[key];
        if (!validkeys.includes(key) || !Array.isArray(currentItem)) return;

        const currentItemsCopy = currentItem.slice() as number[];
        if (checkedStatus === true) {
            currentItemsCopy.push(valueId);
            handleDetailUpdate(key, currentItemsCopy);
            return;
        }

        handleDetailUpdate(key, currentItemsCopy.filter(item => item !== valueId));
    }

    const handleSaveNewPlace = async (passedDetails: NewPlaceDetail | null = null) => {
        let detailsToSubmit: NewPlaceDetail = details;
        if (passedDetails) detailsToSubmit = passedDetails;

        const savedToken = AppConstants.savedToken;
        if (!savedToken || loading) return;

        const missingRequiredDetail = compulsoryDetailKeys.find(key => {
            const value = detailsToSubmit[key as keyof NewPlaceDetail];
          
            return (
                !value || 
                (typeof value !== 'number' && 
                (typeof value === 'string' || Array.isArray(value)) && value.length < 1)
            );
        });
        
        if (missingRequiredDetail) {
            if (
                missingRequiredDetail === newPlaceDetailKeysDict.name ||
                missingRequiredDetail === newPlaceDetailKeysDict.description ||
                missingRequiredDetail === newPlaceDetailKeysDict.type_of_place ||
                missingRequiredDetail === newPlaceDetailKeysDict.pricing_type ||
                missingRequiredDetail === newPlaceDetailKeysDict.locations ||
                missingRequiredDetail === newPlaceDetailKeysDict.benefits
            ) {
                scrollToSectionAndAddErrHighlight(basicInfoRef);
            }

            if (
                missingRequiredDetail === newPlaceDetailKeysDict.gender ||
                missingRequiredDetail === newPlaceDetailKeysDict.caters_to ||
                missingRequiredDetail === newPlaceDetailKeysDict.age_groups
            ) {
                scrollToSectionAndAddErrHighlight(featuresRef);
            }

            if (missingRequiredDetail === newPlaceDetailKeysDict.images) scrollToSectionAndAddErrHighlight(galleryRef);
            if (missingRequiredDetail === newPlaceDetailKeysDict.email) scrollToSectionAndAddErrHighlight(contactRef);
            
            return toast.info(`Please fill in all required info${compulsoryDetailKeysDict[missingRequiredDetail] ? ': found missing ' + '"' + compulsoryDetailKeysDict[missingRequiredDetail] + '"' : ''}`);
        }

        if (isNaN(Number(detailsToSubmit.pricing))) {
            scrollToSectionAndAddErrHighlight(basicInfoRef);
            return toast.info('Please enter a valid number for the pricing of this new place');
        }

        if (detailsToSubmit.locations.find(location => location.address.length < 1 || location.city.length < 1)) {
            scrollToSectionAndAddErrHighlight(basicInfoRef);
            return toast.info('Found missing city or address in location provided');
        }
        
        if (detailsToSubmit.benefits.find(benefit => benefit.length < 1)) {
            scrollToSectionAndAddErrHighlight(basicInfoRef);
            return toast.info('Found missing/empty benefit in provided benefits');
        }
        
        if (detailsToSubmit.master_images.find(master => master.name.length < 1 || (!master.imageFile && master.image.toString().length < 1))) {
            scrollToSectionAndAddErrHighlight(mastersRef);
            return toast.info('Found missing master name or image');
        }

        if (detailsToSubmit.images.length < 5) {
            scrollToSectionAndAddErrHighlight(galleryRef);
            return toast.info('Please upload at least 5 images for your place');
        }

        if (detailsToSubmit.benefits.length < 5) {
            scrollToSectionAndAddErrHighlight(basicInfoRef);
            return toast.info('Please write at least 5 benefits of your place');
        }

        if (detailsToSubmit.documents.length > 0) {
            const invalidDocumentLinkIndex = detailsToSubmit.documents.findIndex(doc => doc.document_type === 'link' && !validateLink(doc.document_link ?? ''));
            if (invalidDocumentLinkIndex !== -1) {
                scrollToSectionAndAddErrHighlight(documentsAddRef);
                return toast.info(`The ${getOrdinalPosition(invalidDocumentLinkIndex + 1)} document link you provided is invalid. Please provide a valid document link`);
            }
        }
        
        const uploadSpeedPerKB = 750;
        const totalFilesAdded: File[] = [
            ...detailsToSubmit.images.flatMap(item => 
                item.imageFile || item.image instanceof File 
                    ? [item.imageFile ?? item.image as File] 
                    : []
            ),
            ...detailsToSubmit.master_images.flatMap(item => 
                item.imageFile || item.image instanceof File 
                    ? [item.imageFile ?? item.image as File] 
                    : []
            ),
            ...detailsToSubmit.documents.flatMap(item => 
                item.file && item.file instanceof File 
                    ? [item.file] 
                    : []
            ),
        ];

        const estimatedUploadTimeInMS = totalFilesAdded.reduce((a, b) => a + b.size, 0) / (uploadSpeedPerKB * 1024) * 1000;
        setEstimatedUploadTimeInMS(estimatedUploadTimeInMS <= 0 ? 3000 : estimatedUploadTimeInMS);
        
        const formData = generateFormDataForNewPlaceDetails(detailsToSubmit, isEditView);
        // console.log('details to submit ->', detailsToSubmit);
        // console.log(formData);
        // saveFormDataToFile(formData);
        // return
        
        setLoading(true);

        if (isEditView) {
            try {
                const res = isAdminUser ?
                    await adminService.editPlace(savedToken, Number(searchParams.get('id')), formData)
                    : 
                await placeService.editPlace(savedToken, Number(searchParams.get('id')), formData);

                // console.log('edit res -> ', res);
                
                if (isAdminUser) {
                    const copyOfPlaces = placesToDisplay.slice();
                    const foundEditedPlaceIndex = placesToDisplay.findIndex(place => place.id === res?.id);
                    if (foundEditedPlaceIndex !== -1) {
                        placesToDisplay[foundEditedPlaceIndex] = res;
                        setPlaces(copyOfPlaces);
                    }
                    
                    if (res.status === 'published') return router.push(`/places/${res.id}`);
                    
                    router.back();
                } else {
                    const copyOfPlaces = userPlaces.slice();
                    const foundEditedPlaceIndex = userPlaces.findIndex(place => place.id === res?.id);
                    if (foundEditedPlaceIndex !== -1) {
                        userPlaces[foundEditedPlaceIndex] = res;
                        setUserPlaces(copyOfPlaces);
                    }

                    router.push(`/places/${res.id}`);
                }
            } catch (error) {
                setLoading(false);
            }
            return
        }

        try {
            const res = isAdminUser ?
                await adminService.createNewPlace(savedToken, formData)
            :
            await placeService.createNewPlace(savedToken, formData);

            if (isAdminUser) {
                setPlaces([
                    res,
                    ...placesToDisplay,
                ]);
            } else {
                setUserPlaces([
                    res,
                    ...userPlaces,
                ]);
            }
            
            // console.log('create res -> ', res);
            // setLoading(false);
            localStorage.removeItem(SAVED_PLACE_DETAIL_IN_STORAGE);
            router.push(`/places/${res.id}`);
        } catch (error: any) {
            if (error?.response?.status === 403) {
                console.log('payment required');
                // handleSavePlaceToStorage(detailsToSubmit);
                setShowPaymentModal(true); 
            }
            
            setLoading(false);
            // setDetailsLoading(false);
        }
    }

    return <>
        {
            detailsLoading && <section className={styles.loader__Wrap}>
                <PageLoader />
            </section>
        }

        <section className={styles.header__Wrap}>
            <h1 className={styles.header}>
                {
                    isEditView ? 
                        'Edit'
                    :
                    'Add new'
                }{' '}studio
            </h1>

            <Button 
                label='See how it works'
                icon={<FaCirclePlay />}
                style={{
                    padding: 0,
                    width: 'max-content',
                    color: 'var(--primary-app-color)',
                    backgroundColor: 'transparent',
                    gap: '0.5rem',
                }}
                useLink
                linkLocation={AppConstants.addNewPlaceTutorialVidLink}
                target='_blank'
                rel='noreferrer noopener'
            />
        </section>
    
        <AddItemWrapper
            title='basic information'
            ref={basicInfoRef}
        >
            <TextInputComponent
                label='place name'
                name={newPlaceDetailKeysDict.name}
                value={details.name}
                onChange={handleDetailUpdate}
                borderRadius='12px'
                isRequired
                labelFontSize='0.85rem'
            />

            <TextInputComponent 
                label='place description'
                name={newPlaceDetailKeysDict.description}
                value={details.description}
                onChange={handleDetailUpdate}
                isTextArea={true}
                borderRadius='12px'
                isRequired
                labelFontSize='0.85rem'
                rows={8}
            />

            <section className={styles.item__Section__Row}>
                <SelectItem 
                    label='place type'
                    options={placeTypes.map(place => ({ id: place.id, value: place.id, label: place.name }))}
                    value={details.type_of_place ?? ''}
                    handleChange={(value) => handleDetailUpdate(newPlaceDetailKeysDict.type_of_place, value)}
                    isRequired
                    style={{
                        fontSize: '0.85rem'
                    }}
                />

                <SelectItem 
                    label='pricing type'
                    options={pricingTypes.map((type, index) => ({ id: index, value: type, label: type }))}
                    value={details.pricing_type ?? ''}
                    handleChange={(value) => handleDetailUpdate(newPlaceDetailKeysDict.pricing_type, value)}
                    isRequired
                    style={{
                        fontSize: '0.85rem'
                    }}
                />

                <TextInputComponent 
                    label='pricing ($)'
                    name={newPlaceDetailKeysDict.pricing}
                    value={`${details.pricing}`}
                    onChange={handleDetailUpdate}
                    borderRadius='12px'
                    type='number'
                    labelFontSize='0.85rem'
                />
            </section>

            <section className={styles.check__Wrap}>
                <section className={`${styles.item__Section__Row} ${styles.styles__Content}`}>
                    <p className={styles.title__Item}>martial art styles offered</p>

                    <Button 
                        label='add'
                        icon={
                            <IoAddOutline />
                        }
                        isLeadingIcon={false}
                        style={{
                            padding: '0',
                            backgroundColor: 'transparent',
                            color: 'var(--primary-app-color)',
                            fontSize: '0.8rem',
                        }}
                        hoverStyle={{
                            color: '#808080',
                        }}
                        handleClick={() => setShowStyleAddModal(true)}
                    />
                </section>

                {
                    stylesLoading ?
                        <section style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <AlternatingDotsLoader />
                        </section>
                    :
                    <section className={styles.listing__Wrap}>
                        {
                            React.Children.toArray(allStyles
                                .map(style => {
                                    return <TextInputComponent 
                                        label={style.name}
                                        type='checkbox'
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: 'max-content',
                                            flexDirection: 'row-reverse',
                                            gap: '1rem',
                                            marginRight: '3rem',
                                        }}
                                        checked={details?.styles?.includes(style.id)}
                                        key={style.id}
                                        handleUpdateChecked={(val) => handleUpdateCheckboxItems(newPlaceDetailKeysDict.styles as keyof NewPlaceDetail, style.id, val)}
                                        accentColor='var(--primary-app-color)'
                                    />
                                }))
                        }
                    </section>
                }
            </section>

            <AddLocationsComponent
                label='Location(s)'
                subtitle={'If you have multiple places, you can add several locations'}
                items={details.locations}
                updateItemsArr={(items: ILocation[]) => handleDetailUpdate(newPlaceDetailKeysDict.locations, items)}
                updateSingleItem={(itemIndex: number, item: string | number | undefined, key: string) => handleUpdateArrayItem(newPlaceDetailKeysDict.locations as keyof NewPlaceDetail, itemIndex, item, key)}
                useCustomCityDropdownListing={!isEditView}
            />

            <AddItemComponent
                label='why choose us?'
                extraInfo='Write 5 benefits'
                placeholder='e.g Professional staff'
                isRequired
                items={details.benefits}
                updateItemsArr={(items: string[]) => handleDetailUpdate(newPlaceDetailKeysDict.benefits, items)}
                updateSingleItem={(itemIndex: number, item: string) => handleUpdateArrayItem(newPlaceDetailKeysDict.benefits as keyof NewPlaceDetail, itemIndex, item)}
            />
        </AddItemWrapper>

        <AddItemWrapper
            title='place gallery'
            extraInfo='We recommend including a youtube video url along with a minimum of 5 and maximum of 15 high-quality images of the place. Please ensure the images are of good resolution and appropriate size'
            ref={galleryRef}
        >
            <section className={styles.item__Section__Col}>
                <TextInputComponent 
                    name={newPlaceDetailKeysDict.video}
                    label='video link'
                    value={details.video}
                    onChange={handleDetailUpdate}
                    borderRadius='12px'
                    labelFontSize='0.85rem'
                />

                <GalleryEditItem 
                    images={details.images}
                    updateImages={(items: IPlaceImage[]) => handleDetailUpdate(newPlaceDetailKeysDict.images, items)}
                />
            </section>
        </AddItemWrapper>
        
        <AddItemWrapper
            title='features information'
            ref={featuresRef}
        >
            <section className={styles.features__Wrap}>
                <section className={styles.check__Wrap}>
                    <p>Offerings</p>

                    <TextInputComponent 
                        label='do you offer a free trial class?'
                        type='checkbox'
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            width: 'max-content',
                            flexDirection: 'row-reverse',
                            gap: '1rem',
                        }}
                        checked={details.free_lesson_available}
                        handleUpdateChecked={(val) => handleDetailUpdate(newPlaceDetailKeysDict.free_lesson_available, val)}
                        accentColor='var(--primary-app-color)'
                    />
                </section>

                <section className={styles.check__Wrap}>
                    <p>Gender <RequiredIndicator /></p>
                    
                    {
                        React.Children.toArray(genderTypes.map(gender => {
                            return <TextInputComponent
                                label={gender.name}
                                type='radio'
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: 'max-content',
                                    flexDirection: 'row-reverse',
                                    gap: '1rem',
                                }}
                                value={gender.name}
                                checked={details.gender === gender.name}
                                onChange={() => handleDetailUpdate(newPlaceDetailKeysDict.gender, gender.name)}
                                key={gender.id}
                                accentColor='var(--primary-app-color)'
                            />
                        }))
                    }
                </section>

                <section className={styles.check__Wrap}>
                    <p>Class Type <RequiredIndicator /></p>
                    
                    {
                        React.Children.toArray(catersTo.map(type => {
                            return <TextInputComponent 
                                label={type.name}
                                type='checkbox'
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: 'max-content',
                                    flexDirection: 'row-reverse',
                                    gap: '1rem',
                                }}
                                checked={details?.caters_to?.includes(type.id)}
                                handleUpdateChecked={(val) => handleUpdateCheckboxItems(newPlaceDetailKeysDict.caters_to as keyof NewPlaceDetail, type.id, val)}
                                key={type.id}
                                accentColor='var(--primary-app-color)'
                            />
                        }))
                    }
                </section>

                <section className={styles.check__Wrap}>
                    <p>Age Groups <RequiredIndicator /></p>
                    
                    {
                        React.Children.toArray(ageGroups.map(group => {
                            return <TextInputComponent 
                                label={group.name}
                                type='checkbox'
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: 'max-content',
                                    flexDirection: 'row-reverse',
                                    gap: '1rem',
                                }}
                                checked={details?.age_groups?.includes(group.id)}
                                handleUpdateChecked={(val) => handleUpdateCheckboxItems(newPlaceDetailKeysDict.age_groups as keyof NewPlaceDetail, group.id, val)}
                                key={group.id}
                                accentColor='var(--primary-app-color)'
                            />
                        }))
                    }
                </section>
            </section>
        </AddItemWrapper>

        <AddItemWrapper
            title='masters information'
            extraInfo='(You can add here max 3 mentor images)'
            ref={mastersRef}
        >
            <MastersAddComponent
                items={details.master_images}
                updateItemsArr={(items: IPlaceMasterImage[]) => handleDetailUpdate(newPlaceDetailKeysDict.master_images, items)}
                updateSingleItem={(itemIndex: number, item: string | File, key: string) => handleUpdateArrayItem(newPlaceDetailKeysDict.master_images as keyof NewPlaceDetail, itemIndex, item, key)}
            />
        </AddItemWrapper>

        <AddItemWrapper
            title='activity hours'
            isRequired
            ref={activityHoursRef}
        >
            <ActivityHoursEdit 
                activityHours={details.activity_hours}
                updateSingleItem={(itemIndex: number, item: string, key: string) => handleUpdateArrayItem(newPlaceDetailKeysDict.activity_hours as keyof NewPlaceDetail, itemIndex, item, key)}
            />
        </AddItemWrapper>
        
        <AddItemWrapper
            title='class schedules'
            ref={classSchedulesRef}
        >
            {
                details.caters_to.length < 1 ?
                    <p
                        style={{
                            fontSize: '0.75rem',
                            textAlign: 'center',
                        }}
                    >You will be able to configure class schedules once you configure the <b>Activity hours</b> section and class types from the <b>Features Information</b> section</p>
                :
                React.Children.toArray(details.caters_to.map((caterToId, index) => {
                    return <>
                        <AddClassSchedule 
                            key={uuidv4()}
                            classNumber={index + 1}
                            classId={caterToId}
                            classSchedules={details.class_schedules_data ?? []}
                            studioActivityDays={details.activity_hours}
                            handleUpdateClassSchedules={(items: IPlaceClassSchedule[]) => handleDetailUpdate(newPlaceDetailKeysDict.class_schedules_data, items)}
                        />
                    </>
                }))
            }
            <></>
        </AddItemWrapper>

        <AddItemWrapper
            title='contact information'
            ref={contactRef}
        >
            <section className={styles.item__Section__Row}>
                <TextInputComponent 
                    label='email'
                    name={newPlaceDetailKeysDict.email}
                    type='email'
                    value={details.email}
                    onChange={handleDetailUpdate}
                    borderRadius='12px'
                    isRequired
                    labelFontSize='0.85rem'
                />

                <TextInputComponent 
                    label='phone number'
                    name='phone_number'
                    value={details.phone_number}
                    onChange={handleDetailUpdate}
                    borderRadius='12px'
                    labelFontSize='0.85rem'
                />
            </section>

            <TextInputComponent 
                label='website url'
                name={newPlaceDetailKeysDict.website}
                value={details.website}
                onChange={handleDetailUpdate}
                borderRadius='12px'
                labelFontSize='0.85rem'
            />
        </AddItemWrapper>

        <AddItemWrapper
            title='commonly asked questions'
            extraInfo='In this section, we recommend adding 3-5 questions with answers'
            ref={faqRef}
        >
            <AddFaqItem 
                faqs={details.faqs}
                updateItemsArr={(items: IPlaceFaq[]) => handleDetailUpdate(newPlaceDetailKeysDict.faqs, items)}
            />
        </AddItemWrapper>

        <AddItemWrapper
            title='documents'
            extraInfo='Drag here health declaration or other documents for the student to confirm before joining class'
            ref={documentsAddRef}
        >
            <DocumentsAdd 
                items={details.documents}
                updateItemsArr={(items: IPlaceDocuments[]) => handleDetailUpdate(newPlaceDetailKeysDict.documents, items)}
            />
        </AddItemWrapper>

        {
            loading ?
                <ProgressBar 
                    durationInMS={estimatedUploadTimeInMS}
                />
            :
            <Button 
                label={
                    isEditView ?
                        'update'
                    :
                    'submit'
                }
                style={{
                    width: 'max-content',
                    backgroundColor: 'var(--primary-app-color)',
                }}
                handleClick={() => handleSaveNewPlace()}
                disabled={loading}
                ref={buttonRef}
            />
        }

        {
            showStyleAddModal && <>
                <StyleAddModal
                    hideModal={() => setShowStyleAddModal(false)}
                />
            </>
        }
    </>
}

export default AddPlaceDetails