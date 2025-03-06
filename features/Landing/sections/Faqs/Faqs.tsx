import FaqsList from '@/features/Dashboard/components/FaqsList/FaqsList'
import React from 'react'
import { landingFaqs } from './utils'
import styles from './styles.module.css'


const Faqs = () => {
    return <>
        <section className={styles.content__Wrap}>
            <h2 className={styles.header}>Frequently Asked Questions</h2>

            <FaqsList 
                faqs={landingFaqs}
            />
        </section>
    </>
}

export default Faqs