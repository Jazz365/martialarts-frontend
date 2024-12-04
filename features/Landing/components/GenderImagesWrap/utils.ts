import women from '../../../../assets/heros/women.png'
import men from '../../../../assets/heros/men.png'
import kids from '../../../../assets/heros/kids.png'
import { StaticImageData } from 'next/image';
import { listingViewTypes } from '@/features/Search/sections/Places/utils';

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
        location: `/search?class=adults&view=${listingViewTypes.listView}`,
        imageUrl: men,
    },
    {
        id: 2,
        title: 'women',
        isMainImage: true,
        location: `/search?class=adults&view=${listingViewTypes.listView}`,
        imageUrl: women,
    },
    {
        id: 3,
        title: 'kids',
        location: `/search?class=minors&view=${listingViewTypes.listView}`,
        imageUrl: kids,
    },
]