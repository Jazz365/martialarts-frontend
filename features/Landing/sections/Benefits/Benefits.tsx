import React from 'react'
import styles from './styles.module.css'
import { benefitsList } from './utils'
import BenefitItem from '../../components/BenefitItem/BenefitItem'

const Benefits = () => {
    return <>
        <section
            className={styles.content__Wrap}
        >
            <h2 className={styles.header}>Why Us?</h2>

            <section className={styles.benefits__Wrap}>
                {
                    React.Children.toArray(benefitsList.map(benefit => {
                        return <BenefitItem 
                            benefit={benefit}
                        />
                    }))
                }
            </section>
        </section>
    </>
}

export default Benefits