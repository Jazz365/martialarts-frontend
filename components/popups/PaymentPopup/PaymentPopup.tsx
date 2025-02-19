'use client';


import React, { useState } from 'react'
import styles from './styles.module.css'
import { IoCloseOutline } from 'react-icons/io5';
import { subscriptionPlans } from '@/utils/subscriptionPlans';
import { AiOutlineCheck } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import Button from '@/components/buttons/Button/Button';
import { AppConstants } from '@/utils/constants';
import { UserService } from '@/services/userService';
import { useAppContext } from '@/contexts/AppContext/AppContext';


const PaymentPopup = () => {
    const {
        showPaymentModal, 
        setShowPaymentModal
    } = useAppContext();

    const [ selectedPlan, setSelectedPlan ] = useState<number | null>(null);
    const [ loading, setLoading ] = useState(false);

    const userService = new UserService();

    const handleHideModal = () => setShowPaymentModal(false);

    const handleSubscribeToPlan = async () => {
        const authToken = AppConstants.savedToken;
        if (!authToken || loading || !selectedPlan) return;

        setLoading(true);

        try {
            const res = (await userService.initiateSubscription(authToken)).data;
            window.location.href = res.approval_url;
        } catch (error) {
            setLoading(false);
        }
    }

    if (!showPaymentModal) return <></>

    return (
        <section className={styles.overlay}>
            <section className={styles.content}>
                <section className={styles.header__Row}>
                    <h3 className={styles.header}>Subscribe</h3>
                    
                    <IoCloseOutline
                        size={'1.5rem'}
                        cursor={'pointer'}
                        onClick={() => handleHideModal()}
                    />
                </section>

                <p className={styles.intro}>You need to have an active subscription to perform this action.</p>

                <section className={styles.plans}>
                    {
                        React.Children.toArray(subscriptionPlans.map(plan => {
                            const isSelectedPlan = selectedPlan === plan.id;

                            return <section 
                                className={`${styles.plan__Summary__Wrap} ${isSelectedPlan ? styles.active : ''}`}
                                key={plan.id}
                                onClick={() => setSelectedPlan(plan.id)}
                            >
                                <section className={styles.plan__Summary}>
                                    <div className={styles.plan__Detail}>
                                        <div className={styles.select__Indicator}></div>
                                        <h3 className={styles.plan__Title}>{plan.title}</h3>
                                    </div>

                                    <p className={styles.plan__Pricing}>{plan.currencySymbol}{plan.pricing}/{plan.paymentInterval}</p>
                                </section>

                                {
                                    isSelectedPlan &&
                                    <>
                                        <br />

                                        {
                                            React.Children.toArray(plan.benefits.map(benefit => {
                                                return <p 
                                                    key={uuidv4()} 
                                                    className={styles.benefit__item}
                                                >
                                                    <AiOutlineCheck />
                                                    <span>{benefit}</span>
                                                </p>
                                            }))
                                        }
                                    </>
                                }
                            </section>
                        }))
                    }
                </section>

                <Button
                    label={
                        loading ? 
                            "please wait..." 
                        :
                        "let's go"
                    }
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '6px',
                        padding: '0.75rem 1rem',
                        fontSize: '0.8rem',
                        background: 'var(--primary-app-color)',
                        color: '#fff',
                        border: '1px solid var(--primary-app-color)',
                        width: 'max-content',
                        margin: '0 auto',
                        filter: `brightness(${loading || !selectedPlan ? 0.65 : 1})`,
                        cursor: loading || !selectedPlan ? 'not-allowed' : 'pointer',
                    }}
                    hoverStyle={{
                        background: 'transparent',
                        color: 'var(--primary-app-color)',
                    }}
                    handleClick={() => handleSubscribeToPlan()}
                    disabled={loading || !selectedPlan}
                />
            </section>
        </section>
    )
}

export default PaymentPopup