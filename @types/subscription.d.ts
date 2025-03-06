type ISubscription = {
    subscription_active: boolean;
    subscription: ISubscriptionDetail;
}

enum SubscriptionStatus {
    PENDING,
    ACTIVE,
}

type ISubscriptionDetail = {
    status: keyof typeof SubscriptionStatus;
    start_date: string;
    next_billing_date?: string;
    is_in_trial: boolean;
    trial_end_date: string;
}