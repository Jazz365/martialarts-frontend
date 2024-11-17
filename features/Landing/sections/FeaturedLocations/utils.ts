import { StaticImageData } from 'next/image';
import image1 from '../../../../assets/locations/glass-wall-long-corridor.webp';
import image2 from '../../../../assets/locations/skyscrapers-sunset.webp';

export const dummyFeaturedLocations: {
    id: number;
    name: string;
    totalPlaces: number;
    image: StaticImageData;
}[] = [
    {
        id: 1,
        name: 'Nigeria',
        totalPlaces: 5,
        image: image1,
    },
    {
        id: 2,
        name: 'India',
        totalPlaces: 10,
        image: image2,
    },
    {
        id: 3,
        name: 'Australia',
        totalPlaces: 3,
        image: image1,
    },
    {
        id: 4,
        name: 'USA',
        totalPlaces: 2,
        image: image2,
    },
    {
        id: 5,
        name: 'China',
        totalPlaces: 5,
        image: image1,
    },
    {
        id: 6,
        name: 'New york',
        totalPlaces: 4,
        image: image2,
    },
]