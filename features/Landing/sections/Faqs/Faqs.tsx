import FaqsList from '@/features/Dashboard/components/FaqsList/FaqsList'
import React from 'react'
import { landingFaqs } from './utils'
import styles from './styles.module.css'


const Faqs = () => {
    return <>
        <section className={styles.content__Wrap}>
            <h4 className={styles.header}>Frequently Asked Questions</h4>

            <FaqsList 
                faqs={landingFaqs}
                questionClassname={styles.faq__Questions}
                questionsGap='0.875rem'
                answerClassname={styles.faq__Answers}
                iconWrapperClassname={styles.faq__ICon}
                addBottomPaddingToSummary={false}
                iconSize='0.8rem'
            />
        </section>
    </>
}

export default Faqs;