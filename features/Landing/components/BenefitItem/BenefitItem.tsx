import React from 'react'
import { IconType } from 'react-icons';
import styles from './styles.module.css'


const BenefitItem = ({
    benefit,
}: {
    benefit: {
        icon: IconType;
        title: string;
        info: string;
    }
}) => {
    const Icon = benefit.icon;

    return <>
        <section className={styles.item__Wrap}>
            <Icon 
                size={'3rem'}
                style={{
                    display: 'block',
                    margin: '0 auto',
                }}
            />
            
            <br />

            <h5 className={styles.header}>{benefit.title}</h5>
            <p className={styles.info}>{benefit.info}</p>
        </section>
    </>
}

export default BenefitItem