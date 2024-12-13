import React from 'react'
import styles from './styles.module.css'


const AddItemWrapper = ({
    title,
    children
}: {
    title: string;
    children: React.ReactNode;
}) => {
    return <>
        <section className={styles.add__Section}>
            <h2 className={styles.title}>{title}</h2>

            <section className={styles.section__Content}>
                {children}
            </section>
        </section>
    </>
}

export default AddItemWrapper