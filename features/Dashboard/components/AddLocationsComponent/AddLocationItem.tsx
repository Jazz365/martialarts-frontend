'use client'

import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.css'
import TextInputComponent from '@/components/inputs/TextInputComponent/TextInputComponent';
// import SelectItem from '@/components/SelectItem/SelectItem';
// import { availableLocations } from '@/utils/locations';
// import { v4 as uuidv4 } from 'uuid';
import { IoTrashOutline } from 'react-icons/io5';
import Divider from '@/features/Places/components/Divider/Divider';
import useMobile from '@/hooks/useMobile';
// import useGoogle from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useLoadScript, Autocomplete, Libraries } from "@react-google-maps/api";
import { useMapContext } from '@/contexts/MapContext';

const libraries: Libraries = ["places"];

const customLocation = 'custom-user-location';
const disabledInputColor = '#f2f2f2';

const AddLocationItem = ({
    item,
    useCustomCityDropdownListing=true,
    handleUpdateItem=()=>{},
    handleDeleteItem=()=>{},
    isLastItemIndex=false,
}: {
    item: {
        address: string;
        city: string;
        state: string;
        zip_code: string;
    };
    handleUpdateItem?: (value: string | number | undefined, key: string) => void;
    useCustomCityDropdownListing?: boolean;
    handleDeleteItem?: () => void;
    isLastItemIndex?: boolean;
}) => {    
    const {
        mapKey,
    } = useMapContext();

    // const {
    //     placesService,
    //     placePredictions,
    //     getPlacePredictions,
    //     isPlacePredictionsLoading,
    // } = mapKey ? useGoogle({
    //     apiKey: mapKey,
    // }) : {};

    const [ locationAddress, setLocationAddress ] = useState('');
    // const [ showCityCustomDropdown, setShowCityCustomDropdown ] = useState<boolean>(true);
    const isMobile = useMobile();

    // const addressInputRef = useRef<HTMLInputElement>(null);

    const { isLoaded } = useLoadScript({ googleMapsApiKey: mapKey, libraries });
    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

    const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
        autocompleteRef.current = autocomplete;
    };

    const onPlaceChanged = () => {
        if (autocompleteRef.current) {
            const place = autocompleteRef.current.getPlace();
            if (place && place.geometry) {
                const address = place.formatted_address ?? '';
                setLocationAddress(address);
                handleUpdateItem(address, 'address');

                const addressComponents = place.address_components;
                if (!addressComponents) return;

                const city = addressComponents.find((component) =>
                    component.types.includes("locality")
                )?.long_name ?? '';
                
                const state = addressComponents.find((component) =>
                    component.types.includes("administrative_area_level_1")
                )?.long_name ?? '';
                
                const zip = addressComponents.find((component) =>
                    component.types.includes("postal_code")
                )?.long_name ?? '';

                const lat = Number(place.geometry?.location?.lat());
                const lng = Number(place.geometry?.location?.lng());
                
                handleUpdateItem(city, 'city');
                handleUpdateItem(state, 'state');
                handleUpdateItem(zip, 'zip_code');

                handleUpdateItem(
                    isNaN(lat) ? 
                        undefined
                    : 
                    lat, 
                    'latitude',
                );

                handleUpdateItem(
                    isNaN(lng) ? 
                        undefined
                    : 
                    lng, 
                    'longitude',
                );
            }
        }
    };
    
    useEffect(() => {
        setLocationAddress(item.address);
    }, [])
    
    return <>
        <li 
            className={styles.single__List__Item}
        >
            
            {
                !isLoaded ?
                    <p style={{ width: '100%', fontSize: '0.8rem' }}>Loading...</p>
                :
                <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged} className={styles.new__Input__Wrap}>
                    <input
                        type="text"
                        value={locationAddress}
                        onChange={(e) => setLocationAddress(e.target.value)}
                        placeholder="e.g 123 Test Avenue..."
                        style={{ 
                            width: "100%", 
                            padding: "0.5rem 1rem", 
                            borderRadius: '12px', 
                            outline: 'none', 
                            border: '1px solid #d3d3d3',
                            fontSize: '0.8rem',
                        }}
                    />
                </Autocomplete>
            }

            {/* <section 
                className={styles.cus__Input__Wrap}
            >
                <TextInputComponent
                    label='address'
                    labelFontSize='0.7rem'
                    placeholder={'e.g 123 Test Avenue'}
                    value={locationAddress}
                    onChange={(_name, value: string) => {
                        if (getPlacePredictions) getPlacePredictions({ input: value });
                        setLocationAddress(value);
                    }}
                    borderRadius='12px'
                    isRequired
                    ref={addressInputRef}
                />

                <ul className={styles.listing}>
                    {
                        isPlacePredictionsLoading ?
                            <li>Loading...</li>
                        :
                        locationAddress.length < 1 ?
                            <li>Start typing to see results</li>
                        :
                        !placePredictions ? <><li></li></>
                        :
                        placePredictions?.length < 1 ?
                            <li>No matching places found</li>
                        :
                        React.Children.toArray(placePredictions.map(prediction => {
                            return <li
                                key={prediction.place_id}
                                className={styles.list__Result}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    if (!placesService || !window?.google || !window?.google?.maps || !window?.google?.maps?.places) return;

                                    placesService?.getDetails(
                                        { placeId: prediction.place_id },
                                        (place, status) => {
                                            if (place && status === window?.google?.maps?.places?.PlacesServiceStatus?.OK) {
                                                // Parse address components for city, state, and ZIP code
                                                const addressComponents = place.address_components;
                                                if (!addressComponents) return;

                                                const city = addressComponents.find((component) =>
                                                  component.types.includes("locality")
                                                )?.long_name;
                                                const state = addressComponents.find((component) =>
                                                  component.types.includes("administrative_area_level_1")
                                                )?.long_name;
                                                const zip = addressComponents.find((component) =>
                                                  component.types.includes("postal_code")
                                                )?.long_name;

                                                const lat = Number(place.geometry?.location?.lat());
                                                const lng = Number(place.geometry?.location?.lng());

                                                setLocationAddress(prediction.description);

                                                handleUpdateItem(prediction.description, 'address');
                                                handleUpdateItem(city ?? '', 'city');
                                                handleUpdateItem(state ?? '', 'state');
                                                handleUpdateItem(zip ?? '', 'zip_code');
                                                handleUpdateItem(
                                                    isNaN(lat) ? 
                                                        undefined
                                                    : 
                                                    lat, 
                                                    'latitude',
                                                );

                                                handleUpdateItem(
                                                    isNaN(lng) ? 
                                                        undefined
                                                    : 
                                                    lng, 
                                                    'longitude',
                                                );

                                                addressInputRef.current?.blur();
                                            }
                                        }
                                    );
                                }}
                            >
                                {prediction.description}
                            </li>
                        }))
                    }
                </ul>
            </section> */}

            {/* <TextInputComponent
                label='address'
                labelFontSize='0.7rem'
                placeholder={'e.g 123 Test Avenue'}
                value={item.address}
                onChange={(_name, value: string) => handleUpdateItem(value, 'address')}
                borderRadius='12px'
                isRequired
            /> */}

            {
                // showCityCustomDropdown === true ? <>
                //     <SelectItem
                //         label='city'
                //         labelFontSize='0.7rem'
                //         fontSize='0.8rem'
                //         value={item.city}
                //         options={[
                //             {
                //                 id: uuidv4(),
                //                 value: customLocation,
                //                 label: 'enter custom',
                //             },
                //             ...Object.keys(availableLocations).map(item => ({ 
                //                 id: item + '--', 
                //                 value: item, 
                //                 label: item 
                //             }))
                //         ]}
                //         handleChange={(value: string) => 
                //             {
                //                 const selectedValue = value;

                //                 if (selectedValue === customLocation) return setShowCityCustomDropdown(false);

                //                 handleUpdateItem(selectedValue, 'city');
                //                 handleUpdateItem(availableLocations[selectedValue], 'state');
                //             }
                //         }
                //         isRequired
                //     />
                // </> :
                // <>
                //     <TextInputComponent 
                //         label='city'
                //         labelFontSize='0.7rem'
                //         value={item.city}
                //         // onChange={(_name, value: string) => handleUpdateItem(value, 'city')}
                //         borderRadius='12px'
                //         isRequired
                //         style={{
                //             maxWidth: isMobile ? '100%' : 'calc(calc(70% / 3) - 1rem - 1.2rem)',
                //         }}
                //         inputBackgroundColor={disabledInputColor}
                //         isDisabled
                //     />
                // </>
            }

            {/* <TextInputComponent 
                label='state'
                labelFontSize='0.7rem'
                value={item.state}
                // isDisabled={showCityCustomDropdown}
                // onChange={(_name, value: string) => handleUpdateItem(value, 'state')}
                borderRadius='12px'
                isRequired
                style={{
                    maxWidth: isMobile ? '100%' : 'calc(calc(70% / 3) - 1rem - 1.2rem)',
                }}
                inputBackgroundColor={disabledInputColor}
                isDisabled
            /> */}

            {/* <TextInputComponent 
                label='zip code'
                labelFontSize='0.7rem'
                placeholder={'10000'}
                value={item.zip_code}
                type='number'
                // onChange={(_name, value: string) => handleUpdateItem(value, 'zip_code')}
                borderRadius='12px'
                // isRequired
                style={{
                    maxWidth: isMobile ? '100%' : 'calc(calc(70% / 3) - 1rem - 1.2rem)',
                }}
                inputBackgroundColor={disabledInputColor}
                isDisabled
            /> */}

            <IoTrashOutline
                cursor={'pointer'}
                size={'1.2rem'}
                onClick={() => handleDeleteItem()}
                color='#f90000'
                className={styles.del__Icon}
            />
            
            <div 
                className={styles.mob__Add__Title}
                onClick={() => handleDeleteItem()}
            >
                <span>Delete address detail</span>
                <IoTrashOutline
                    size={'0.65rem'}
                    color='#f90000'
                />
            </div>
        </li>

        {
            !isLastItemIndex && isMobile &&
            <Divider />
        }
    </>
}

export default AddLocationItem