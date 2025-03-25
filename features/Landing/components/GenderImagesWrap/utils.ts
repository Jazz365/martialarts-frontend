import women from '../../../../assets/heros/women.webp'
import men from '../../../../assets/heros/men.webp'
import kids from '../../../../assets/heros/kids.webp'
import { StaticImageData } from 'next/image';
import { listingSortOptions, listingViewTypes } from '@/features/Search/sections/Places/utils';

export const genderImgsInfo: {
    title: string;
    isMainImage?: boolean;
    location: string;
    imageUrl: StaticImageData;
    id: number;
}[] = [
    {
        id: 1,
        title: 'men',
        location: `/search?gender=male&view=${listingViewTypes.listView}&sort=${listingSortOptions.sort_by_newest}`,
        imageUrl: men,
    },
    {
        id: 2,
        title: 'women',
        isMainImage: true,
        location: `/search?gender=female&view=${listingViewTypes.listView}&sort=${listingSortOptions.sort_by_newest}`,
        imageUrl: women,
    },
    {
        id: 3,
        title: 'kids',
        location: `/search?gender=both&view=${listingViewTypes.listView}&sort=${listingSortOptions.sort_by_newest}`,
        imageUrl: kids,
    },
]