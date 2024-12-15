import React from 'react'
import styles from './styles.module.css'
import { HiOutlineChevronDown } from 'react-icons/hi2';
import { AiOutlineQuestion } from 'react-icons/ai';


const FaqsList = ({
    faqs=[],
}: {
    faqs: IPlaceFaq[];
}) => {

    return <>
        <section className={styles.list__Wrap}>
            {
                React.Children.toArray(faqs.map(faq => {
                    return <details
                        key={faq.id}
                        className={styles.details__Wrap}
                    >
                        <summary>
                            <section className={styles.question__Wrap}>
                                <section className={styles.icon__Wrap}>
                                    <AiOutlineQuestion />
                                </section>
                                <span className={styles.question}>{faq.question}</span>
                            </section>
                            
                            <HiOutlineChevronDown />
                        </summary>

                        <p className={styles.answer}>{faq.answer}</p>
                    </details>
                }))
            }
        </section>
    </>
}

export default FaqsList