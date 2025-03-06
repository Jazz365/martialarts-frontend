import { v4 as uuidv4 } from 'uuid';

export const placesStatViewOptions: {
    id: string;
    title: string;
    subtitle: string;
    dataItemKey: keyof IPlacesDashboardData;
    datasetKey: string;
    labelKey: string;
}[] = [
    {
        id: uuidv4(),
        title: 'most popular',
        subtitle: 'explore the most visited studios',
        dataItemKey: 'popular',
        datasetKey: 'visits',
        labelKey: 'name',
    },
    {
        id: uuidv4(),
        title: 'highest rated',
        subtitle: 'discover studios with the highest ratings',
        dataItemKey: 'best_rated',
        datasetKey: 'rating',
        labelKey: 'name',
    },
    {
        id: uuidv4(),
        title: 'most booked',
        subtitle: 'find studios with the most bookings',
        dataItemKey: 'most_booked',
        datasetKey: 'bookings',
        labelKey: 'name',
    },
]