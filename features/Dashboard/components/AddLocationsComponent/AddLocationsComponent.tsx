import Button from '@/components/Button/Button';
import React from 'react'
import styles from './styles.module.css'
import { IoAddOutline, IoTrashOutline } from 'react-icons/io5';
import TextInputComponent from '@/components/TextInputComponent/TextInputComponent';
import { toast } from 'sonner';
import SelectItem from '@/components/SelectItem/SelectItem';
import { availableLocations } from '@/utils/locations';
import { v4 as uuidv4 } from 'uuid';
import RequiredIndicator from '@/components/RequiredIndicator/RequiredIndicator';

const AddLocationsComponent = ({
    label='',
    items=[],
    updateItemsArr=()=>{},
    updateSingleItem=()=>{},
    maxItemCap = 9,
}: {
    label: string;
    items?: ILocation[]
    updateItemsArr?: (val: ILocation[]) => void;
    updateSingleItem?: (itemIndex: number, value: string, key: string) => void;
    maxItemCap?: number;
}) => {
    const handleAddNewItem = () => {
        const copyOfCurrentItems = items.slice();
        copyOfCurrentItems.push({
            id: uuidv4(),
            address: '',
            city: '',
            zip_code: '',
            state: '',
            latitude: 40.748817,
            longitude: -73.985428,
        });

        if (copyOfCurrentItems.length > maxItemCap) return toast.info(`You can only add a maximum of ${maxItemCap} item(s)`)

        updateItemsArr(copyOfCurrentItems);
    }

    const handleDeleteItem = (itemIndexToDelete: number) => {
        const copyOfCurrentItems = items.slice();
        updateItemsArr(copyOfCurrentItems.filter((_item, index) => index !== itemIndexToDelete));
    }

    return <>
        <section className={styles.item__Wrap}>
            <p className={styles.title}>{label} <RequiredIndicator /></p>

            <ul className={styles.items__List}>
                {
                    React.Children.toArray(items.map((item, index) => {
                        return <li 
                            className={styles.single__List__Item}
                            key={item.id}
                        >
                            <TextInputComponent 
                                label='address'
                                labelFontSize='0.7rem'
                                placeholder={'e.g 123 Test Avenue'}
                                value={item.address}
                                onChange={(_name, value: string) => updateSingleItem(index, value, 'address')}
                                borderRadius='12px'
                                isRequired
                            />

                            <SelectItem 
                                label='city'
                                labelFontSize='0.7rem'
                                fontSize='0.8rem'
                                value={item.city}
                                options={Object.keys(availableLocations).map(item => ({ 
                                    id: item + '--', 
                                    value: item, 
                                    label: item 
                                }))}
                                handleChange={(value: string) => 
                                    {
                                        const selectedValue = value;

                                        updateSingleItem(index, selectedValue, 'city');
                                        updateSingleItem(index, availableLocations[selectedValue], 'state');
                                    }
                                }
                                isRequired
                            />

                            <TextInputComponent 
                                label='state'
                                labelFontSize='0.7rem'
                                value={item.state}
                                isDisabled={true}
                                borderRadius='12px'
                            />

                            <TextInputComponent 
                                label='zip code'
                                labelFontSize='0.7rem'
                                placeholder={'10000'}
                                value={item.zip_code}
                                type='number'
                                onChange={(_name, value: string) => updateSingleItem(index, value, 'zip_code')}
                                borderRadius='12px'
                                isRequired
                            />

                            <IoTrashOutline
                                cursor={'pointer'}
                                size={'1.2rem'}
                                onClick={() => handleDeleteItem(index)}
                                style={{
                                    width: '8%',
                                }}
                                color='#f90000'
                            />
                        </li>
                    }))
                }
            </ul>

            <Button 
                label='add new'
                icon={
                    <IoAddOutline 
                        size={'1.1rem'}
                    />
                }
                style={{
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.75rem',
                    width: 'max-content',
                    backgroundColor: 'transparent',
                    border: '1px solid #000',
                    color: '#000',
                }}
                hoverStyle={{
                    backgroundColor: 'var(--primary-app-color)',
                    borderColor: 'var(--primary-app-color)',
                    color: '#fff'
                }}
                handleClick={handleAddNewItem}
            />
        </section>
    </>
}

export default AddLocationsComponent