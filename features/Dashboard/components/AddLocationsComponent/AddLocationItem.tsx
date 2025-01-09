'use client'

import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import TextInputComponent from '@/components/inputs/TextInputComponent/TextInputComponent';
import SelectItem from '@/components/SelectItem/SelectItem';
import { availableLocations } from '@/utils/locations';
import { v4 as uuidv4 } from 'uuid';
import { IoTrashOutline } from 'react-icons/io5';
import Divider from '@/features/Places/components/Divider/Divider';
import useMobile from '@/hooks/useMobile';


const customLocation = 'custom-user-location';

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
    handleUpdateItem?: (value: string, key: string) => void;
    useCustomCityDropdownListing?: boolean;
    handleDeleteItem?: () => void;
    isLastItemIndex?: boolean;
}) => {
    const [ showCityCustomDropdown, setShowCityCustomDropdown ] = useState<boolean>(true);
    const isMobile = useMobile();
    
    useEffect(() => {
        setShowCityCustomDropdown(useCustomCityDropdownListing);
    }, [])
    
    return <>
        <li 
            className={styles.single__List__Item}
        >
            <TextInputComponent
                label='address'
                labelFontSize='0.7rem'
                placeholder={'e.g 123 Test Avenue'}
                value={item.address}
                onChange={(_name, value: string) => handleUpdateItem(value, 'address')}
                borderRadius='12px'
                isRequired
            />

            {
                showCityCustomDropdown === true ? <>
                    <SelectItem
                        label='city'
                        labelFontSize='0.7rem'
                        fontSize='0.8rem'
                        value={item.city}
                        options={[
                            {
                                id: uuidv4(),
                                value: customLocation,
                                label: 'enter custom',
                            },
                            ...Object.keys(availableLocations).map(item => ({ 
                                id: item + '--', 
                                value: item, 
                                label: item 
                            }))
                        ]}
                        handleChange={(value: string) => 
                            {
                                const selectedValue = value;

                                if (selectedValue === customLocation) return setShowCityCustomDropdown(false);

                                handleUpdateItem(selectedValue, 'city');
                                handleUpdateItem(availableLocations[selectedValue], 'state');
                            }
                        }
                        isRequired
                    />
                </> :
                <>
                    <TextInputComponent 
                        label='city'
                        labelFontSize='0.7rem'
                        value={item.city}
                        onChange={(_name, value: string) => handleUpdateItem(value, 'city')}
                        borderRadius='12px'
                        isRequired
                    />
                </>
            }

            <TextInputComponent 
                label='state'
                labelFontSize='0.7rem'
                value={item.state}
                isDisabled={showCityCustomDropdown}
                onChange={(_name, value: string) => handleUpdateItem(value, 'state')}
                borderRadius='12px'
                isRequired
            />

            <TextInputComponent 
                label='zip code'
                labelFontSize='0.7rem'
                placeholder={'10000'}
                value={item.zip_code}
                type='number'
                onChange={(_name, value: string) => handleUpdateItem(value, 'zip_code')}
                borderRadius='12px'
                isRequired
            />

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