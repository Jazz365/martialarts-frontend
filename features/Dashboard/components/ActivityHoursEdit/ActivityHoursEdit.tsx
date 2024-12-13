import React from 'react'
import styles from './styles.module.css'
import TextInputComponent from '@/components/TextInputComponent/TextInputComponent';


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
                        <p className={styles.title}>{item.day}</p>

                        <TextInputComponent 
                            label='opening time'
                            labelFontSize='0.7rem'
                            borderRadius='12px'
                            type='time'
                            value={item.opening_time}
                            onChange={(_name, value: string) => updateSingleItem(index, value, 'opening_time')}
                        />

                        <TextInputComponent 
                            label='closing time'
                            labelFontSize='0.7rem'
                            borderRadius='12px'
                            type='time'
                            value={item.closing_time}
                            onChange={(_name, value: string) => updateSingleItem(index, value, 'closing_time')}
                        />
                    </section>
                }))
            }
        </section>
    </>
}

export default ActivityHoursEdit