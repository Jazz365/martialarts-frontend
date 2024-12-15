export interface SubscriptionPlan {
    id: number;
    title: string;
    pricing: number;
    paymentInterval: string;
    benefits: string[];
}

export const subscriptionPlans: SubscriptionPlan[] = [
    {
        id: 1,
        title: 'unlimited places',
        pricing: 29,
        paymentInterval: 'month',
        benefits: [
            'unlimited places',
            'unlimited places',
            'unlimited places',
        ]
    },
    {
        id: 2,
        title: 'success based',
        pricing: 25,
        paymentInterval: 'booking',
        benefits: [
            'charged only for successful booking',
            'charged only for successful booking',
            'charged only for successful booking',
        ]
    }
]