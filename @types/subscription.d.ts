interface ISubscription {
    subscription_active: boolean;
    subscription: ISubscriptionDetail;
}

interface ISubscriptionDetail {
    status: string;
    start_date: string;
    next_billing_date?: string;
    is_in_trial: boolean;
    trial_end_date: string;
}