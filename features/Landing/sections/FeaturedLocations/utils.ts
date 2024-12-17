import { StaticImageData } from 'next/image';
import image1 from '../../../../assets/locations/california.png';
import image2 from '../../../../assets/locations/florida.png';
import image3 from '../../../../assets/locations/illinois.png';
import image4 from '../../../../assets/locations/new-york.png';
import image5 from '../../../../assets/locations/texas.png';
import image6 from '../../../../assets/locations/washington.png';

export const dummyFeaturedLocations: {
    id: number;
    name: string;
    totalPlaces: number;
    image: StaticImageData;
}[] = [
    {
        id: 1,
        name: 'california',
        totalPlaces: 5,
        image: image1,
    },
    {
        id: 2,
        name: 'florida',
        totalPlaces: 10,
        image: image2,
    },
    {
        id: 3,
        name: 'illinois',
        totalPlaces: 3,
        image: image3,
    },
    {
        id: 4,
        name: 'new york',
        totalPlaces: 2,
        image: image4,
    },
    {
        id: 5,
        name: 'texas',
        totalPlaces: 5,
        image: image5,
    },
    {
        id: 6,
        name: 'washington',
        totalPlaces: 4,
        image: image6,
    },
    {
        id: 7,
        name: 'texas',
        totalPlaces: 5,
        image: image5,
    },
]