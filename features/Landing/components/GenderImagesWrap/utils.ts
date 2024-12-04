import bannerImage1 from '../../../../assets/heros/female-hero.webp'
import bannerImage2 from '../../../../assets/heros/male-hero.webp'
import bannerImage3 from '../../../../assets/heros/kids-hero.webp'
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
        imageUrl: bannerImage2,
    },
    {
        id: 2,
        title: 'women',
        isMainImage: true,
        location: `/search?class=adults&view=${listingViewTypes.listView}`,
        imageUrl: bannerImage1,
    },
    {
        id: 3,
        title: 'kids',
        location: `/search?class=minors&view=${listingViewTypes.listView}`,
        imageUrl: bannerImage3,
    },
]