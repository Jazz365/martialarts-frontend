import Button from '@/components/Button/Button';
import React from 'react'
import styles from './styles.module.css'
import { IoAddOutline, IoTrashOutline } from 'react-icons/io5';
import TextInputComponent from '@/components/TextInputComponent/TextInputComponent';
import { toast } from 'sonner';
import RequiredIndicator from '@/components/RequiredIndicator/RequiredIndicator';


const AddItemComponent = ({
    label='',
    placeholder='',
    items=[],
    updateItemsArr=()=>{},
    updateSingleItem=()=>{},
    maxItemCap = 9,
    isRequired=false,
}: {
    label: string;
    placeholder?: string;
    items?: string[]
    updateItemsArr?: (val: string[]) => void;
    updateSingleItem?: (itemIndex: number, value: string) => void;
    maxItemCap?: number;
    isRequired?: boolean;
}) => {
    const handleAddNewItem = () => {
        const copyOfCurrentItems = items.slice();
        copyOfCurrentItems.push('');

        if (copyOfCurrentItems.length > maxItemCap) return toast.info(`You can only add a maximum of ${maxItemCap} item(s)`)

        updateItemsArr(copyOfCurrentItems);
    }

    const handleDeleteItem = (itemIndexToDelete: number) => {
        const copyOfCurrentItems = items.slice();
        updateItemsArr(copyOfCurrentItems.filter((_item, index) => index !== itemIndexToDelete));
    }

    return <>
        <section className={styles.item__Wrap}>
            <p className={styles.title}>
                {label}
                {
                    isRequired ? <>
                        {' '}<RequiredIndicator />
                    </>
                    :
                    <></>
                }
            </p>

            <ul className={styles.items__List}>
                {
                    React.Children.toArray(items.map((item, index) => {
                        return <li 
                            className={styles.single__List__Item}
                            key={index}
                        >
                            <TextInputComponent 
                                placeholder={placeholder}
                                value={item}
                                onChange={(_name, value: string) => updateSingleItem(index, value)}
                                borderRadius='12px'
                            />

                            <IoTrashOutline
                                cursor={'pointer'}
                                size={'1.2rem'}
                                onClick={() => handleDeleteItem(index)}
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
                    background: 'transparent',
                    border: '1px solid #000',
                    color: '#000',
                }}
                hoverStyle={{
                    background: '#000',
                    color: '#fff'
                }}
                handleClick={handleAddNewItem}
            />
        </section>
    </>
}

export default AddItemComponent