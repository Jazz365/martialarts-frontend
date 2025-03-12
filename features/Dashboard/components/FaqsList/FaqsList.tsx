import React from 'react'
import styles from './styles.module.css'
import { HiOutlineChevronDown } from 'react-icons/hi2';
import { IoTrashOutline } from 'react-icons/io5';
import { HiOutlineChatAlt2 } from 'react-icons/hi';


const FaqsList = ({
    faqs=[],
    showDeleteIcon=false,
    handleDeleteFaq=()=>{},
    questionClassname,
    answerClassname,
    iconWrapperClassname,
    iconSize='1rem',
    questionsGap,
    addBottomPaddingToSummary=true,
}: {
    faqs: IPlaceFaq[];
    showDeleteIcon?: boolean;
    handleDeleteFaq?: (val: number | string | undefined) => void;
    questionClassname?: string;
    answerClassname?: string;
    iconWrapperClassname?: string;
    iconSize?: string;
    questionsGap?: string;
    addBottomPaddingToSummary?: boolean;
}) => {

    return <>
        <section className={styles.list__Wrap} style={{ gap: questionsGap }}>
            {
                React.Children.toArray(faqs.map(faq => {
                    return <details
                        key={faq.id}
                        className={styles.details__Wrap}
                    >
                        <summary style={{ paddingBottom: addBottomPaddingToSummary ? '0.8rem' : '0' }}>
                            <section className={styles.question__Wrap}>
                                <section className={`${styles.icon__Wrap} ${iconWrapperClassname ?? ''}`}>
                                    <HiOutlineChatAlt2 size={iconSize} />
                                </section>
                                <span className={`${styles.question} ${questionClassname ?? ''}`}>
                                    {faq.question}
                                </span>
                            </section>
                            
                            <section className={styles.action__Icons}>
                                <HiOutlineChevronDown size={iconSize} />
                                {
                                    
                                    showDeleteIcon ?
                                        <IoTrashOutline
                                            cursor={'pointer'}
                                            size={'1.2rem'}
                                            onClick={() => handleDeleteFaq(faq?.id)}
                                            color='#f90000'
                                        />
                                    :
                                    <></>
                                }
                            </section>
                        </summary>

                        <p className={`${styles.answer} ${answerClassname ?? ''}`}>{faq.answer}</p>
                    </details>
                }))
            }
        </section>
    </>
}

export default FaqsList