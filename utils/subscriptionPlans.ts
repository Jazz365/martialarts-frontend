export interface SubscriptionPlan {
    id: number;
    title: string;
    pricing: number;
    paymentInterval: string;
    currencySymbol: string;
    currency: string;
    benefits: string[];
}

export const subscriptionPlans: SubscriptionPlan[] = [
    {
        id: 1,
        title: 'monthly plan',
        pricing: 29,
        paymentInterval: 'month',
        currencySymbol: '$',
        currency: 'USD',
        benefits: [
            'Enjoy a 1-month free trial.',
            'Monthly subscription.',
            'No commitment - cancel anytime.',
            'Unlimited listings and access to all features.',
            'Full flexibility to manage your account at any time.',
        ]
    },
    // {
    //     id: 2,
    //     title: 'per student',
    //     pricing: 25,
    //     paymentInterval: 'booking',
    //     benefits: [
    //         'One-time fee per student upon attendance.',
    //         'Credit Card details are required for enrollment.',
    //         'Unlimited listings and access to all features.',
    //         'Full flexibility to manage your account at any time.',
    //     ]
    // }
]