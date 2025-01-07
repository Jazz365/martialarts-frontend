'use client';

import SelectItem from '@/components/SelectItem/SelectItem';
import TextInputComponent from '@/components/inputs/TextInputComponent/TextInputComponent'
import AddItemWrapper from '@/features/Dashboard/components/AddItemWrapper/AddItemWrapper'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import AddItemComponent from '@/features/Dashboard/components/AddItemComponent/AddItemComponent';
import { compulsoryDetailKeys, generateFormDataForNewPlaceDetails, initialNewPlaceDetail, NewPlaceDetail, newPlaceDetailKeysDict, pricingTypes } from './utils';
import AddLocationsComponent from '@/features/Dashboard/components/AddLocationsComponent/AddLocationsComponent';
import MastersAddComponent from '@/features/Dashboard/components/MastersAddComponent/MastersAddComponent';
import ActivityHoursEdit from '@/features/Dashboard/components/ActivityHoursEdit/ActivityHoursEdit';
import AddFaqItem from '@/features/Dashboard/components/AddFaqItem/AddFaqItem';
import Button from '@/components/Button/Button';
import GalleryEditItem from '@/features/Dashboard/components/GalleryEditItem/GalleryEditItem';
import { genderTypes } from '@/utils/genderTypes';
import RequiredIndicator from '@/components/RequiredIndicator/RequiredIndicator';
import { toast } from 'sonner';
import { PlaceService } from '@/services/placeService';
import { AppConstants } from '@/utils/constants';
import { useAppContext } from '@/contexts/AppContext/AppContext';
import { useRouter, useSearchParams } from 'next/navigation';
import PageLoader from '@/components/loaders/PageLoader/PageLoader';
import { IoAddOutline } from 'react-icons/io5';
import StyleAddModal from '@/components/StyleAddModal/StyleAddModal';
import DocumentsAdd from '@/features/Dashboard/components/DocumentsAdd/DocumentsAdd';
import { getAllDaysOfTheWeek } from '@/helpers/helpers';
import { v4 as uuidv4 } from 'uuid';


const daysOfTheWeek = getAllDaysOfTheWeek();

const AddPlaceDetails = () => {
    const [ details, setDetails ] = useState<NewPlaceDetail>(initialNewPlaceDetail);
    const [ detailsLoading, setDetailsLoading ] = useState<boolean>(false);
    const [ showStyleAddModal, setShowStyleAddModal ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState(false);
    const [ isEditView, setIsEditView ] = useState(false);

    const searchParams = useSearchParams();

    const { 
        allStyles,
        stylesLoading,
        placeTypes, 
        catersTo, 
        ageGroups,
        userPlaces, 
        setUserPlaces,
    } = useAppContext();

    const router = useRouter();

    const placeService = new PlaceService();

    const handleDetailUpdate = (
        key: string, 
        value: string | boolean | string[] | number[] | ILocation[] | IPlaceMasterImage[] | IPlaceFaq[] | IPlaceImage[] | IPlaceDocuments[]
    ) => {
        setDetails((prevDetails) => {
            return {
                ...prevDetails,
                [key]: value,
            }
        });
    }

    useEffect(() => {
        const idPassed = searchParams.get('id');
        if (!idPassed || isNaN(Number(idPassed))) return setIsEditView(false);

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

            setDetails({
                ...res,
                benefits: res?.benefits?.split(','),
                styles: res?.place_styles?.map((item: IMartialArtStyle) => item.id),
                locations: res?.place_locations,
                master_images: res?.master_images_data,
                images: res?.images_data,
                caters_to: res?.place_caters_to?.map((item: ICatersTo) => item.id),
                activity_hours: formattedActivityHours,
                faqs: res?.place_faqs,
                policy: res?.policy?.content,
                documents: res?.documents_data,
                age_groups: res?.place_age_groups?.map((item: IPlaceAgeGroups) => item.id),
            });
            setDetailsLoading(false);
        }).catch(() => {
            setDetailsLoading(false);
        })
    }, [searchParams])

    const handleUpdateArrayItem = (
        key: keyof NewPlaceDetail, 
        index: number, 
        value: string | File, 
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

    const handleSaveNewPlace = async () => {
        const savedToken = AppConstants.getSavedToken();
        if (!savedToken) return;

        const missingRequiredDetail = compulsoryDetailKeys.find(key => {
            const value = details[key as keyof NewPlaceDetail];
          
            return (
                !value || 
                (typeof value !== 'number' && 
                (typeof value === 'string' || Array.isArray(value)) && value.length < 1)
            );
        });

        if (missingRequiredDetail) return toast.info('Please fill in all required info');
        if (isNaN(Number(details.pricing))) return toast.info('Please enter a valid number for the pricing of this new place');
        if (details.locations.find(location => location.address.length < 1 || location.city.length < 1 || location.zip_code.length < 1)) return toast.info('Found missing city or address in location provided');
        if (details.benefits.find(benefit => benefit.length < 1)) return toast.info('Found missing/empty benefit in provided benefits');
        if (details.master_images.find(master => master.name.length < 1 || (!master.imageFile && master.image.toString().length < 1))) return toast.info('Found missing master name or image');
        if (details.images.length < 5) return toast.info('Please upload at least 5 images for your place');
        if (details.benefits.length < 5) return toast.info('Please write at least 5 benefits of your place');
        
        const formData = generateFormDataForNewPlaceDetails(details, isEditView);
        // console.log(formData);
        // return
        
        setLoading(true);

        if (isEditView) {
            try {
                const res = await placeService.editPlace(savedToken, Number(searchParams.get('id')), formData);
                
                const copyOfPlaces = userPlaces.slice();
                const foundEditedPlaceIndex = userPlaces.findIndex(place => place.id === res?.id);
                if (foundEditedPlaceIndex !== -1) {
                    userPlaces[foundEditedPlaceIndex] = res;
                    setUserPlaces(copyOfPlaces);
                }

                router.push(`/places/${res.id}`);
            } catch (error) {
                setLoading(false);
            }
            return
        }

        try {
            const res = await placeService.createNewPlace(savedToken, formData);
            setUserPlaces([
                res,
                ...userPlaces,
            ]);
            
            // setLoading(false);
            router.push(`/places/${res.id}`);
        } catch (_err) {
            setLoading(false);   
        }
    }

    return <>
        {
            detailsLoading && <section className={styles.loader__Wrap}>
                <PageLoader />
            </section>
        }

        <h1 className={styles.header}>
            {
                isEditView ? 
                    'Edit'
                :
                'Add new'
            }{' '}studio
        </h1>
    
        <AddItemWrapper
            title='basic information'
        >
            <TextInputComponent
                label='place name'
                name={newPlaceDetailKeysDict.name}
                value={details.name}
                onChange={handleDetailUpdate}
                borderRadius='12px'
                isRequired
            />

            <TextInputComponent 
                label='place description'
                name={newPlaceDetailKeysDict.description}
                value={details.description}
                onChange={handleDetailUpdate}
                isTextArea={true}
                borderRadius='12px'
                isRequired
            />

            <section className={styles.item__Section__Row}>
                <SelectItem 
                    label='place type'
                    options={placeTypes.map(place => ({ id: place.id, value: place.id, label: place.name }))}
                    value={details.type_of_place ?? ''}
                    handleChange={(value) => handleDetailUpdate(newPlaceDetailKeysDict.type_of_place, value)}
                    isRequired
                />

                <SelectItem 
                    label='pricing type'
                    options={pricingTypes.map((type, index) => ({ id: index, value: type, label: type }))}
                    value={details.pricing_type ?? ''}
                    handleChange={(value) => handleDetailUpdate(newPlaceDetailKeysDict.pricing_type, value)}
                    isRequired
                />

                <TextInputComponent 
                    label='pricing ($)'
                    name={newPlaceDetailKeysDict.pricing}
                    value={`${details.pricing}`}
                    onChange={handleDetailUpdate}
                    borderRadius='12px'
                    type='number'
                />
            </section>

            <section className={styles.check__Wrap}>
                <section className={`${styles.item__Section__Row} ${styles.styles__Content}`}>
                    <p className={styles.title__Item}>martial art styles offered</p>

                    <Button 
                        label='add new'
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
                        <PageLoader />
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
                                    />
                                }))
                        }
                    </section>
                }
            </section>

            <AddLocationsComponent
                label='Location(s)'
                items={details.locations}
                updateItemsArr={(items: ILocation[]) => handleDetailUpdate(newPlaceDetailKeysDict.locations, items)}
                updateSingleItem={(itemIndex: number, item: string, key: string) => handleUpdateArrayItem(newPlaceDetailKeysDict.locations as keyof NewPlaceDetail, itemIndex, item, key)}
            />

            <AddItemComponent
                label='why choose us?'
                extraInfo='(write at least 5 benefits)'
                placeholder='e.g Professional staff'
                isRequired
                items={details.benefits}
                updateItemsArr={(items: string[]) => handleDetailUpdate(newPlaceDetailKeysDict.benefits, items)}
                updateSingleItem={(itemIndex: number, item: string) => handleUpdateArrayItem(newPlaceDetailKeysDict.benefits as keyof NewPlaceDetail, itemIndex, item)}
            />
        </AddItemWrapper>

        <AddItemWrapper
            title='contact information'
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
                />

                <TextInputComponent 
                    label='phone number'
                    name='phone_number'
                    value={details.phone_number}
                    onChange={handleDetailUpdate}
                    borderRadius='12px'
                />
            </section>

            <TextInputComponent 
                label='website url'
                name={newPlaceDetailKeysDict.website}
                value={details.website}
                onChange={handleDetailUpdate}
                borderRadius='12px'
            />
        </AddItemWrapper>

        <AddItemWrapper
            title='masters information'
            extraInfo='(you can add here max 3 mentor images)'
        >
            <MastersAddComponent
                items={details.master_images}
                updateItemsArr={(items: IPlaceMasterImage[]) => handleDetailUpdate(newPlaceDetailKeysDict.master_images, items)}
                updateSingleItem={(itemIndex: number, item: string | File, key: string) => handleUpdateArrayItem(newPlaceDetailKeysDict.master_images as keyof NewPlaceDetail, itemIndex, item, key)}
            />
        </AddItemWrapper>

        <AddItemWrapper
            title='place gallery'
            extraInfo='(min 5 images max 15 images)'
        >
            <section className={styles.item__Section__Col}>
                <TextInputComponent 
                    name={newPlaceDetailKeysDict.video}
                    label='video link'
                    value={details.video}
                    onChange={handleDetailUpdate}
                    borderRadius='12px'
                />

                <GalleryEditItem 
                    images={details.images}
                    updateImages={(items: IPlaceImage[]) => handleDetailUpdate(newPlaceDetailKeysDict.images, items)}
                />
            </section>
        </AddItemWrapper>
        
        <AddItemWrapper
            title='features information'
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
                            />
                        }))
                    }
                </section>
            </section>
        </AddItemWrapper>

        <AddItemWrapper
            title='activity hours'
            isRequired
        >
            <ActivityHoursEdit 
                activityHours={details.activity_hours}
                updateSingleItem={(itemIndex: number, item: string, key: string) => handleUpdateArrayItem(newPlaceDetailKeysDict.activity_hours as keyof NewPlaceDetail, itemIndex, item, key)}
            />
        </AddItemWrapper>

        <AddItemWrapper
            title='commonly asked questions'
        >
            <AddFaqItem 
                faqs={details.faqs}
                updateItemsArr={(items: IPlaceFaq[]) => handleDetailUpdate(newPlaceDetailKeysDict.faqs, items)}
            />
        </AddItemWrapper>

        <AddItemWrapper
            title='documents'
            extraInfo='Drag here health declaration or other documents for the student to confirm before joining class'
        >
            <DocumentsAdd 
                items={details.documents}
                updateItemsArr={(items: IPlaceDocuments[]) => handleDetailUpdate(newPlaceDetailKeysDict.documents, items)}
            />
        </AddItemWrapper>

        <Button 
            label={
                loading ? 
                    isEditView ?
                        'updating...'
                    :
                    'creating...'
                :
                isEditView ?
                    'update'
                :
                'submit'
            }
            style={{
                width: 'max-content',
                backgroundColor: 'var(--primary-app-color)',
            }}
            handleClick={handleSaveNewPlace}
            disabled={loading}
        />

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