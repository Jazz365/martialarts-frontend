import bannerImage1 from '../../../../assets/heros/female-hero.webp'
import bannerImage2 from '../../../../assets/heros/male-hero.webp'
import bannerImage3 from '../../../../assets/heros/kids-hero.webp'
import { StaticImageData } from 'next/image';

export const bannerImgsInfo: {
    title: string;
    isMainImage?: boolean;
    location: string;
    imageUrl: StaticImageData;
    id: number;
}[] = [
    {
        id: 1,
        title: 'women',
        isMainImage: true,
        location: '/search?gender=women',
        imageUrl: bannerImage1,
    },
    {
        id: 2,
        title: 'men',
        location: '/search?gender=men',
        imageUrl: bannerImage2,
    },
    {
        id: 3,
        title: 'kids',
        location: '/search?gender=kids',
        imageUrl: bannerImage3,
    },
]