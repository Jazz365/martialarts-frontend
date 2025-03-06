type IDashboardData = {
    bookings: IBookingDashboardData;
    places: IPlacesDashboardData;
    reviews: IReviewsDashboardData;
    subscriptions: ISubscriptionDashboardData;
    users: IUsersDashboardData;
    visits: IVisitsDashboardData;
}


type IBookingDashboardData = {
    pending: number;
    confirmed: number;
    today: number;
    trend: {
        date: string;
        count: number;
    }[];
    total: number;
}

type IPlacesDashboardData = {
    best_rated: {
        id: number;
        name: string;
        rating: number;
    }[];
    draft: number;
    most_booked: {
        id: number;
        name: string;
        bookings: number;
    }[];
    new_30d: number;
    popular: {
        id: number;
        name: string;
        visits: number;
    }[];
    published: number;
    total: number;
}

type IReviewsDashboardData = {
    avg_rating: number;
    new_30d: number;
    total: number;
}

type ISubscriptionDashboardData = {
    active: number;
    new_30d: number;
    trial: number;
}

type IUsersDashboardData = {
    active_30d: number;
    new_30d: number;
    owners: number;
    students: number;
    total: number;
}

type IVisitsDashboardData = {
    month: number;
    week: number;
    total: number;
}