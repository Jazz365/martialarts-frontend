import React from 'react'
import styles from './styles.module.css'
import TextInputComponent from '@/components/TextInputComponent/TextInputComponent';
import { newPlaceDetailKeysDict } from '@/app/dashboard/owner/studios/add-studio/utils';


const ActivityHoursEdit = ({
    activityHours=[],
    updateSingleItem=()=>{},
}: {
    activityHours: IPlaceActivityHours[];
    updateSingleItem?: (itemIndex: number, value: string, key: string) => void;
}) => {
    return <>
        <section className={styles.content__Wrap}>
            {
                React.Children.toArray(activityHours.map((item, index) => {
                    return <section 
                        className={styles.single__Item}
                        key={item.id}
                    >
                        <p className={styles.title}>
                            <span>{item.day}</span>

                            <TextInputComponent 
                                label='open'
                                type='checkbox'
                                checked={item.closing_time.length > 0 && item.opening_time.length > 0}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: 'max-content',
                                    flexDirection: 'row-reverse',
                                    gap: '0.3rem',
                                }}
                                labelFontSize='0.75rem'
                                handleUpdateChecked={(val) => {
                                    if (val === true) {
                                        updateSingleItem(index, '09:00', newPlaceDetailKeysDict.opening_time);
                                        updateSingleItem(index, '17:00', newPlaceDetailKeysDict.closing_time);

                                        return;
                                    }

                                    updateSingleItem(index, '', newPlaceDetailKeysDict.opening_time);
                                    updateSingleItem(index, '', newPlaceDetailKeysDict.closing_time);
                                }}
                            />
                        </p>

                        <TextInputComponent 
                            label='opening time'
                            labelFontSize='0.7rem'
                            borderRadius='12px'
                            type='time'
                            value={item.opening_time}
                            onChange={(_name, value: string) => updateSingleItem(index, value, newPlaceDetailKeysDict.opening_time)}
                        />

                        <TextInputComponent 
                            label='closing time'
                            labelFontSize='0.7rem'
                            borderRadius='12px'
                            type='time'
                            value={item.closing_time}
                            onChange={(_name, value: string) => updateSingleItem(index, value, newPlaceDetailKeysDict.closing_time)}
                        />
                    </section>
                }))
            }
        </section>
    </>
}

export default ActivityHoursEdit