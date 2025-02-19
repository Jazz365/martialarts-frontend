'use client';


import { SubscriptionPlan } from '@/utils/subscriptionPlans'
import React, { useEffect, useState } from 'react'
import styles from './styles.module.css'
import { AiOutlineCheck } from 'react-icons/ai';
import Button from '@/components/buttons/Button/Button';
import { AppConstants } from '@/utils/constants';
import { UserService } from '@/services/userService';
import { useUserContext } from '@/contexts/UserContext';
import { HiBadgeCheck } from 'react-icons/hi';
import { formatDate } from '@/helpers/helpers';
import { v4 as uuidv4 } from 'uuid';


const SubscriptionCard = ({
    plan
}: {
    plan: SubscriptionPlan;
}) => {
    const [ loading, setLoading ] = useState(false);
    const {
        userSubscription,
        subscriptionDetailLoading,
        setSubscriptionDetailLoaded,
    } = useUserContext();

    const userService = new UserService();
    const isActivePlan = true; // to be updated when details about the plan are included in the subscription

    const userSubscriptionIsActive = isActivePlan && userSubscription?.subscription && userSubscription?.subscription_active === true && userSubscription.subscription.status === 'ACTIVE';
    
    useEffect(() => {
        setSubscriptionDetailLoaded(false);
    }, [])
    
    const handleSubscribeToPlan = async (plan: SubscriptionPlan) => {
        const authToken = AppConstants.savedToken;
        if (!authToken || loading) return;

        setLoading(true);

        try {
            const res = (await userService.initiateSubscription(authToken)).data;
            window.location.href = res.approval_url;
        } catch (error) {
            setLoading(false);
        }
    }

    return <>
        <section className={styles.sub__Card}>
            <section className={styles.title__Wrap}>
                <h5 className={styles.title}>{plan.title}</h5>
                {
                    userSubscriptionIsActive &&
                    <HiBadgeCheck 
                        size={'1.6rem'}
                        color='var(--primary-app-color)'
                    />
                }
            </section>

            <p className={styles.pricing__Wrap}>
                <span className={styles.pricing}>{plan.currencySymbol}{plan.pricing}</span>
                <span>/{plan.paymentInterval}</span>
            </p>

            <section className={styles.benefits}>
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
            </section>

            {
                userSubscriptionIsActive &&
                <section className={styles.billing__Detail}>
                    {
                        userSubscription?.subscription?.is_in_trial === true ?
                            <>
                                <p className={styles.billing__Info}>Free trial active</p>
                                <p><b className={styles.billing__Info}>Trial ends on: </b>{formatDate(new Date(userSubscription?.subscription?.trial_end_date ?? ''), true)}</p>
                            </>
                        :
                        <>
                            <p><b className={styles.billing__Info}>Next billing date: </b>{formatDate(new Date(userSubscription?.subscription?.next_billing_date ?? ''), true)}</p>
                        </>
                    }
                </section>
            }

            {
                !userSubscriptionIsActive &&
                <Button 
                    label={
                        (loading || subscriptionDetailLoading) ? 
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
                    }}
                    hoverStyle={{
                        background: 'transparent',
                        color: 'var(--primary-app-color)',
                    }}
                    className={styles.act__Btn}
                    handleClick={() => handleSubscribeToPlan(plan)}
                    disabled={loading || subscriptionDetailLoading}
                />
            }
        </section>
    </>
}

export default SubscriptionCard