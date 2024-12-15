import React from 'react'
import styles from './styles.module.css'
import RequiredIndicator from '@/components/RequiredIndicator/RequiredIndicator';


const AddItemWrapper = ({
    title,
    isRequired=false,
    children,
}: {
    title: string;
    children: React.ReactNode;
    isRequired?: boolean;
}) => {
    return <>
        <section className={styles.add__Section}>
            <h2 className={styles.title}>
                {title}
                {
                    isRequired ? <>
                        {' '}<RequiredIndicator />
                    </>
                    :
                    <></>
                }
            </h2>

            <section className={styles.section__Content}>
                {children}
            </section>
        </section>
    </>
}

export default AddItemWrapper