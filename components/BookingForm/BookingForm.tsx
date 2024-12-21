import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { useAppContext } from '@/contexts/AppContext'
import { IoCloseOutline } from 'react-icons/io5';
import Button from '../Button/Button';
import { PlaceService } from '@/services/placeService';
import Carousel from '../Carousel/Carousel';
import Image from 'next/image';
import TextInputComponent from '../TextInputComponent/TextInputComponent';
import { BookingDetails, bookingDetailsDict, bookingUserOptions, formPageDetail, initialBookingDetails, requiredInfo } from './utils';
import PageLoader from '../PageLoader/PageLoader';
import { useUserContext } from '@/contexts/UserContext';
import Divider from '@/features/Places/components/Divider/Divider';
import RequiredIndicator from '../RequiredIndicator/RequiredIndicator';
import { toast } from 'sonner';
import { BookingService } from '@/services/bookingService';
import { AppConstants } from '@/utils/constants';


const BookingForm = () => {
    const {
        selectedPlaceId,
        setSelectedPlaceId,
        bookings,
        setBookings,
    } = useAppContext();

    const {
        userDetails
    } = useUserContext();

    const [ currentPage, setCurrentPage ] = useState<number>(1);
    const [ bookingDetails, setBookingDetails ] = useState<BookingDetails>(initialBookingDetails)
    const [ selectedPlaceDetailsLoading, setSelectedPlaceDetailsLoading ] = useState(true);
    const [ loading, setLoading ] = useState(false);
    const [ selectedPlace, setSelectedPlace ] = useState<IPlace | null>(null);

    const placeService = new PlaceService();
    const bookingService = new BookingService();

    const handleDetailUpdate = (
        key: string, 
        value: string | boolean | number[] | number
    ) => {
        setBookingDetails((prevDetails) => {
            return {
                ...prevDetails,
                [key]: value,
            }
        });
    }

    const handleUpdateCheckboxItems = (key: keyof BookingDetails, styleId: number, checkedStatus: boolean) => {
        const validkeys = [bookingDetails.selected_styles];

        const currentItem = bookingDetails[key];
        if (!Array.isArray(currentItem)) return;

        handleDetailUpdate(bookingDetailsDict.child_name, '');
        handleDetailUpdate(bookingDetailsDict.child_email, '');
        handleDetailUpdate(bookingDetailsDict.child_dob, '');
        handleDetailUpdate(bookingDetailsDict.child_phone_number, '');

        const currentItemsCopy = currentItem.slice() as number[];
        if (checkedStatus === true) {
            currentItemsCopy.push(styleId);
            handleDetailUpdate(key, currentItemsCopy);
            return;
        }

        handleDetailUpdate(key, currentItemsCopy.filter(item => item !== styleId));
    }

    useEffect(() => {
        if (selectedPlace || !selectedPlaceId) return setSelectedPlaceDetailsLoading(false);
        if (!userDetails) return;

        placeService.getSinglePlace(selectedPlaceId).then(res => {
            setSelectedPlace(res);

            handleDetailUpdate(bookingDetailsDict.place_id, selectedPlaceId);
            handleDetailUpdate(bookingDetailsDict.email, userDetails?.email);
            handleDetailUpdate(bookingDetailsDict.phone, userDetails?.phone_number ?? '');

            setSelectedPlaceDetailsLoading(false);
        }).catch(() => {
            setSelectedPlaceDetailsLoading(false);
        });

    }, [selectedPlace, userDetails]);

    const handleGoToPreviousPage = () => {
        if (loading) return;
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    const handleGoToNextPage = async () => {
        const authToken = AppConstants.getSavedToken();

        if (loading || !authToken) return;

        const requiredItemsForPage: string[] = requiredInfo[currentPage];

        if (currentPage === 1 && bookingDetails.is_for_child === null) return toast.info('Please fill in all required info');

        if (currentPage > 1) {
            const missingRequiredInfo = requiredItemsForPage.find((item: string) => {
                const missingItem = bookingDetails[item as keyof BookingDetails] as string | number[];
                
                return missingItem?.length < 1
            });

            if (missingRequiredInfo) return toast.info('Please fill in all required info');
        }

        if (currentPage === 2) {
            if (bookingDetails.is_for_child === false) return setCurrentPage(currentPage + 1);

            if (
                !bookingDetails.child_name ||
                bookingDetails.child_name && bookingDetails?.child_name?.length < 1 ||
                !bookingDetails.child_email ||
                bookingDetails.child_email && bookingDetails?.child_email?.length < 1 ||
                !bookingDetails.child_dob ||
                bookingDetails.child_dob && bookingDetails?.child_dob?.length < 1
            ) return toast.info('Please fill in all required info');            
        }

        if (currentPage === 3) {
            if (bookingDetails.agreed_to_health_declaration === false || bookingDetails.agreed_to_liability_waiver === false) return toast.info('Please agree to all terms before continuing');

            setLoading(true);

            try {
                const res = await bookingService.createNewBooking(authToken, bookingDetails);
                
                setLoading(false);
                setBookings([
                    {
                        ...res,
                        status: 'pending'
                    },
                    ...bookings,
                ]);
                setSelectedPlaceId(null);
            } catch (error) {
                setLoading(false);                
            }

            return
        }

        setCurrentPage(currentPage + 1);
    }

    return (
        <section className={styles.overlay}>
            <section className={styles.content}>
                {
                    selectedPlaceDetailsLoading ?
                        <PageLoader />
                    :
                    <>
                        <section className={styles.header__Row}>
                            <h3 className={styles.header}>New Booking</h3>
                            <IoCloseOutline 
                                size={'1.5rem'}
                                cursor={'pointer'}
                                onClick={() => setSelectedPlaceId(null)}
                            />
                        </section>

                        <section className={styles.progress}>
                            {
                                React.Children.toArray(formPageDetail.map(item => {
                                    return <section 
                                        className={`${styles.progress__Item} ${currentPage >= item.id ? styles.active : ''}`}
                                        key={item.id}
                                    >
                                        <section className={styles.progress__Indicator}></section>
                                        <p>{item.name}</p>
                                    </section>
                                }))
                            }
                            
                        </section>

                        {
                            currentPage === 1 ? <>
                                <section className={styles.selected__place}>
                                    <h4 className={styles.place__Title}>Selected place</h4>
                                    
                                    <section className={styles.place__Details}>
                                        <Carousel 
                                            style={{
                                                width: '40%',
                                                borderRadius: '24px'
                                            }}
                                            delay={2000}
                                        >
                                            {
                                                React.Children.toArray(selectedPlace?.images_data.map(item => {
                                                    return <Image 
                                                        src={item.image as string}
                                                        alt={selectedPlace?.name}
                                                        width={0}
                                                        height={180}
                                                        style={{
                                                            borderRadius: '24px',
                                                            width: '100%',
                                                            objectFit: 'cover',
                                                        }}
                                                        key={item.id}
                                                    />
                                                }))
                                            }
                                        </Carousel>

                                        <section className={styles.details__Info}>
                                            <h3 className={styles.place__Name}>{selectedPlace?.name}</h3>

                                            <p className={styles.detail__item}>
                                                <span className={styles.detail__Title}>styles offered</span>
                                                <span className={styles.detail__Info}>{selectedPlace?.place_styles?.map(style => style.name)?.join(', ')}</span>
                                            </p>

                                            <p className={styles.detail__item}>
                                                <span className={styles.detail__Title}>skill levels</span>
                                                <span className={styles.detail__Info}>{selectedPlace?.place_caters_to?.map(item => item.name)?.join(', ')}</span>
                                            </p>

                                            <p className={styles.detail__item}>
                                                <span className={styles.detail__Title}>pricing</span>
                                                <span className={styles.detail__Info}>from ${selectedPlace?.pricing}</span>
                                            </p>
                                        </section>
                                    </section>
                                </section>
                                
                                <br/>

                                <section className={styles.detail__item}>
                                    <p className={styles.label__Item}>Are you an adult or signing up a child? <RequiredIndicator /></p>

                                    <section className={styles.options}>
                                        {
                                            React.Children.toArray(bookingUserOptions.map(option => {
                                                return <TextInputComponent 
                                                    name=''
                                                    checked={bookingDetails.is_for_child === option.value}
                                                    type='radio'
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        width: 'max-content',
                                                        flexDirection: 'row-reverse',
                                                        gap: '1rem',
                                                    }}
                                                    onChange={() => handleDetailUpdate(bookingDetailsDict.is_for_child, option.value)}
                                                    label={'I am ' + option.name}
                                                    key={option.id}
                                                />
                                            }))
                                        }
                                    </section>
                                </section>
                            </> :
                            currentPage === 2 ? <>
                                <section className={styles.input__Row}>
                                    <TextInputComponent 
                                        label='full name'
                                        name={bookingDetailsDict.name}
                                        value={bookingDetails.name}
                                        onChange={handleDetailUpdate}
                                        isRequired
                                        borderRadius='12px'
                                        style={{
                                            width: 'calc(50% - 0.5rem)',
                                        }}
                                    />

                                    <TextInputComponent 
                                        label='email'
                                        name={bookingDetailsDict.email}
                                        value={bookingDetails.email}
                                        onChange={handleDetailUpdate}
                                        isRequired
                                        borderRadius='12px'
                                        style={{
                                            width: 'calc(50% - 0.5rem)',
                                        }}
                                    />
                                </section>

                                <TextInputComponent 
                                    label='phone'
                                    name={bookingDetailsDict.phone}
                                    value={bookingDetails.phone}
                                    onChange={handleDetailUpdate}
                                    borderRadius='12px'
                                />

                                <section className={styles.detail__item}>
                                    <p className={styles.label__Item}>select style preferences <RequiredIndicator /></p>
                                    <section className={styles.listing__Wrap}>
                                        {
                                            React.Children.toArray(selectedPlace?.place_styles
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
                                                        checked={bookingDetails?.selected_styles?.includes(style.id)}
                                                        key={style.id}
                                                        handleUpdateChecked={(val) => handleUpdateCheckboxItems(bookingDetailsDict.selected_styles as keyof BookingDetails, style.id, val)}
                                                    />
                                                })
                                            )
                                        }
                                    </section>
                                </section>

                                {
                                    bookingDetails.is_for_child === true && <>
                                        <Divider />
                                        
                                        <p className={styles.label__Item}>Child personal info</p>
                                        
                                        <section className={styles.input__Row}>
                                            <TextInputComponent 
                                                label='child name'
                                                name={bookingDetailsDict.child_name}
                                                value={bookingDetails.child_name}
                                                onChange={handleDetailUpdate}
                                                isRequired
                                                borderRadius='12px'
                                                style={{
                                                    width: 'calc(50% - 0.5rem)',
                                                }}
                                            />

                                            <TextInputComponent 
                                                label='child email'
                                                name={bookingDetailsDict.child_email}
                                                value={bookingDetails.child_email}
                                                onChange={handleDetailUpdate}
                                                isRequired
                                                borderRadius='12px'
                                                style={{
                                                    width: 'calc(50% - 0.5rem)',
                                                }}
                                            />
                                        </section>

                                        <section className={styles.input__Row}>
                                            <TextInputComponent 
                                                label='child date of birth'
                                                name={bookingDetailsDict.child_dob}
                                                value={bookingDetails.child_dob}
                                                onChange={handleDetailUpdate}
                                                borderRadius='12px'
                                                type='date'
                                                isRequired
                                                style={{
                                                    width: 'calc(50% - 0.5rem)',
                                                }}
                                            />
                                            
                                            <TextInputComponent 
                                                label='child phone'
                                                name={bookingDetailsDict.child_phone_number}
                                                value={bookingDetails.child_phone_number}
                                                onChange={handleDetailUpdate}
                                                borderRadius='12px'
                                                style={{
                                                    width: 'calc(50% - 0.5rem)',
                                                }}
                                            />
                                        </section>
                                    </>
                                }
                            </> :
                            currentPage === 3 ? <>
                                <section className={styles.input__Row}>
                                    <TextInputComponent 
                                        label='appointment date'
                                        name={bookingDetailsDict.date}
                                        value={bookingDetails.date}
                                        onChange={(targetName, targetValue) => {
                                            const openDatesForPlace = selectedPlace?.place_activity_hours.flatMap(item => 
                                                item.opening_time.length > 0 && item.closing_time.length > 0 ? [item.day.toLocaleLowerCase()] : []
                                            ) ?? [];

                                            const isDayValid = (date: Date) => {
                                                const dayOfWeek = date.toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
                                                return openDatesForPlace.includes(dayOfWeek);
                                            };

                                            if (!isDayValid(new Date(targetValue))) return toast.info('Sorry, this studio is not open on this day!');

                                            handleDetailUpdate(targetName, targetValue);
                                        }}
                                        borderRadius='12px'
                                        type='date'
                                        isRequired
                                        style={{
                                            width: 'calc(50% - 0.5rem)',
                                        }}
                                        min={new Date().toISOString().split('T')[0]}
                                    />

                                    {/* <TextInputComponent 
                                        label='appointment time'
                                        name={bookingDetailsDict.time}
                                        value={bookingDetails.time}
                                        onChange={handleDetailUpdate}
                                        borderRadius='12px'
                                        type='time'
                                        isRequired
                                        style={{
                                            width: 'calc(50% - 0.5rem)',
                                        }}
                                    /> */}
                                </section>

                                <section className={styles.details__Info}>
                                    <TextInputComponent 
                                        label="I have reviewed and accepted the studio's health declaration form."
                                        type='checkbox'
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: 'max-content',
                                            flexDirection: 'row-reverse',
                                            gap: '1rem',
                                            maxWidth: '100%',
                                        }}
                                        handleUpdateChecked={(val) => handleDetailUpdate(bookingDetailsDict.agreed_to_health_declaration, val)}
                                        checked={bookingDetails.agreed_to_health_declaration}
                                    />

                                    <TextInputComponent 
                                        label={`I understand and accept the risks involved in martial arts classes and waive all liability ${bookingDetails.is_for_child === true ? 'for my child' : '.'}`}
                                        type='checkbox'
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            width: 'max-content',
                                            flexDirection: 'row-reverse',
                                            gap: '1rem',
                                            maxWidth: '100%',
                                        }}
                                        handleUpdateChecked={(val) => handleDetailUpdate(bookingDetailsDict.agreed_to_liability_waiver, val)}
                                        checked={bookingDetails.agreed_to_liability_waiver}
                                    />
                                </section>
                            </>
                            :
                            <>
                            
                            </>
                        }

                        <section className={`${styles.header__Row} ${styles.actions}`}>
                            <Button
                                label='back'
                                style={{
                                    background: 'transparent',
                                    border: '1px solid #000',
                                    color: '#000',
                                    padding: '0.65rem 1.5rem'
                                }}
                                handleClick={handleGoToPreviousPage}
                            />

                            <Button 
                                label={
                                    loading ?
                                        'creating...'
                                    :
                                    currentPage === 3 ?
                                        'submit'
                                    :
                                    'next'
                                }
                                style={{
                                    padding: '0.65rem 1.5rem'
                                }}
                                handleClick={handleGoToNextPage}
                            />
                        </section>
                    </>
                }
            </section>
        </section>
    )
}

export default BookingForm