import Button from '@/components/Button/Button'
import React from 'react'
import { userTypes } from './utils';
import styles from './styles.module.css';
import { useSearchParams } from 'next/navigation';


const UserTypeSelect = ({
    authType,
}: {
    authType: string;
}) => {
    const params = useSearchParams();

    return <>
        <section className={styles.select__Wrap}>
            {
                React.Children.toArray((Object.keys(userTypes) as Array<keyof typeof userTypes>).map(type => {
                    return <Button
                        label={userTypes[type]}
                        useLink={true}
                        linkLocation={`/auth/${authType}?type=${type}`}
                        key={type}
                        style={{
                            backgroundColor: params.get('type') === type ?
                                '#000'
                            :
                            'transparent',
                            color: params.get('type') === type ?
                                '#fff'
                            :
                            '#808080',
                        }}
                    />
                }))
            }
        </section>
    </>
}

export default UserTypeSelect