import { StaticImageData } from 'next/image';
import image1 from '../../../../assets/places/1.webp';
import image2 from '../../../../assets/places/2.webp';
import image3 from '../../../../assets/places/3.webp';
import image4 from '../../../../assets/places/4.webp';

export const dummyFeaturedPlaces:{
    id: number;
    name: string;
    location: {
        address: string;
        city: string;
        state: string;
    };
    image: StaticImageData;
    average_rating: number;
    activity_hours: {
        opening_time: string;
        closing_time: string;
        days: string;
    },
    free_lesson_available: boolean;
    is_featured: boolean;
    price: number;
    place_styles: IMartialArtStyle[];
    place_caters_to: ICatersTo[];
}[] = [
    {
        id: 1,
        name: 'Featured Studio',
        location: {
            address: '',
            city: 'Chicago',
            state: 'Illinois',
        },
        image: image1,
        average_rating: 5.0,
        activity_hours: {
            opening_time: '08:00',
            closing_time: '20:00',
            days: 'Mondays - Fridays'
        },
        free_lesson_available: true,
        is_featured: true,
        price: 100,
        place_styles: [
            {
                "id": 1,
                "name": "Judo"
            },
        ],
        place_caters_to: [
            {
                "id": 2,
                "name": "beginner"
            },
            {
                "id": 4,
                "name": "advanced"
            },
        ],
    },
    {
        id: 2,
        name: 'Featured Studio',
        location: {
            address: '',
            city: 'Nevada',
            state: 'Las Vegas',
        },
        image: image2,
        average_rating: 5.0,
        activity_hours: {
            opening_time: '08:00',
            closing_time: '20:00',
            days: 'Mondays - Fridays'
        },
        free_lesson_available: true,
        is_featured: true,
        price: 100,
        place_styles: [
            {
                "id": 1,
                "name": "Judo"
            },
        ],
        place_caters_to: [
            {
                "id": 2,
                "name": "beginner"
            },
            {
                "id": 4,
                "name": "advanced"
            },
        ],
    },
    {
        id: 3,
        name: 'Featured Studio',
        location: {
            address: '',
            city: 'Atlanta',
            state: 'Georgia',
        },
        image: image3,
        average_rating: 5.0,
        activity_hours: {
            opening_time: '08:00',
            closing_time: '20:00',
            days: 'Mondays - Saturdays'
        },
        free_lesson_available: true,
        is_featured: true,
        price: 100,
        place_styles: [
            {
                "id": 1,
                "name": "Judo"
            },
        ],
        place_caters_to: [
            {
                "id": 2,
                "name": "beginner"
            },
            {
                "id": 4,
                "name": "advanced"
            },
        ],
    },
    {
        id: 4,
        name: 'Featured Studio',
        location: {
            address: '',
            city: 'Colorado',
            state: 'Denver',
        },
        image: image4,
        average_rating: 5.0,
        activity_hours: {
            opening_time: '08:00',
            closing_time: '20:00',
            days: 'Mondays - Fridays'
        },
        free_lesson_available: true,
        is_featured: true,
        price: 100,
        place_styles: [
            {
                "id": 1,
                "name": "Judo"
            },
        ],
        place_caters_to: [
            {
                "id": 2,
                "name": "beginner"
            },
            {
                "id": 4,
                "name": "advanced"
            },
        ],
    },
    // {
    //     id: 5,
    //     name: 'Wood Vale',
    //     location: {
    //         address: '118 Dummy Street',
    //         city: 'Surulere',
    //         state: 'lagos',
    //     },
    //     image: image4,
    //     average_rating: 4.45,
    //     activity_hours: {
    //         opening_time: '08:00',
    //         closing_time: '20:00',
    //         days: 'Mondays - Fridays'
    //     },
    //     free_lesson_available: true,
    //     is_featured: true,
    //     price: 100,
    //     place_styles: [
    //         {
    //             "id": 1,
    //             "name": "Judo"
    //         },
    //         {
    //             "id": 2,
    //             "name": "capoeira"
    //         }
    //     ],
    //     place_caters_to: [
    //         {
    //             "id": 1,
    //             "name": "Men"
    //         },
    //         {
    //             "id": 2,
    //             "name": "Women"
    //         },
    //         {
    //             "id": 3,
    //             "name": "Kids"
    //         }
    //     ],
    // },
    // {
    //     id: 6,
    //     name: 'Iron Lotus Temple',
    //     location: {
    //         address: '128 Dummy Street',
    //         city: 'Apapa',
    //         state: 'lagos',
    //     },
    //     image: image3,
    //     average_rating: 4.62,
    //     activity_hours: {
    //         opening_time: '08:00',
    //         closing_time: '20:00',
    //         days: 'Mondays - Fridays'
    //     },
    //     free_lesson_available: true,
    //     is_featured: true,
    //     price: 120,
    //     place_styles: [
    //         {
    //             "id": 1,
    //             "name": "Judo"
    //         },
    //         {
    //             "id": 2,
    //             "name": "capoeira"
    //         }
    //     ],
    //     place_caters_to: [
    //         {
    //             "id": 1,
    //             "name": "Men"
    //         },
    //         {
    //             "id": 2,
    //             "name": "Women"
    //         },
    //         {
    //             "id": 3,
    //             "name": "Kids"
    //         }
    //     ],
    // },
    // {
    //     id: 7,
    //     name: 'The Silent Fist Monastery',
    //     location: {
    //         address: '8 Dummy Street',
    //         city: 'Bariga',
    //         state: 'lagos',
    //     },
    //     image: image2,
    //     average_rating: 4.5,
    //     activity_hours: {
    //         opening_time: '08:00',
    //         closing_time: '20:00',
    //         days: 'Mondays - Fridays'
    //     },
    //     free_lesson_available: true,
    //     is_featured: true,
    //     price: 100,
    //     place_styles: [
    //         {
    //             "id": 1,
    //             "name": "Judo"
    //         },
    //         {
    //             "id": 2,
    //             "name": "capoeira"
    //         }
    //     ],
    //     place_caters_to: [
    //         {
    //             "id": 1,
    //             "name": "Men"
    //         },
    //         {
    //             "id": 2,
    //             "name": "Women"
    //         },
    //         {
    //             "id": 3,
    //             "name": "Kids"
    //         }
    //     ],
    // },
    // {
    //     id: 8,
    //     name: 'The Eternal Flame School',
    //     location: {
    //         address: '108 Dummy Street',
    //         city: 'Surulere',
    //         state: 'lagos',
    //     },
    //     image: image1,
    //     average_rating: 4.5,
    //     activity_hours: {
    //         opening_time: '08:00',
    //         closing_time: '20:00',
    //         days: 'Mondays - Saturdays'
    //     },
    //     free_lesson_available: true,
    //     is_featured: true,
    //     price: 100,
    //     place_styles: [
    //         {
    //             "id": 1,
    //             "name": "Judo"
    //         },
    //         {
    //             "id": 2,
    //             "name": "capoeira"
    //         }
    //     ],
    //     place_caters_to: [
    //         {
    //             "id": 1,
    //             "name": "Men"
    //         },
    //         {
    //             "id": 2,
    //             "name": "Women"
    //         },
    //         {
    //             "id": 3,
    //             "name": "Kids"
    //         }
    //     ],
    // },
    // {
    //     id: 9,
    //     name: 'Sunfire Temple',
    //     location: {
    //         address: '131 Dummy Street',
    //         city: 'Surulere',
    //         state: 'lagos',
    //     },
    //     image: image2,
    //     average_rating: 4.5,
    //     activity_hours: {
    //         opening_time: '08:00',
    //         closing_time: '20:00',
    //         days: 'Mondays - Fridays'
    //     },
    //     free_lesson_available: true,
    //     is_featured: true,
    //     price: 100,
    //     place_styles: [
    //         {
    //             "id": 1,
    //             "name": "Judo"
    //         },
    //         {
    //             "id": 2,
    //             "name": "capoeira"
    //         }
    //     ],
    //     place_caters_to: [
    //         {
    //             "id": 1,
    //             "name": "Men"
    //         },
    //         {
    //             "id": 2,
    //             "name": "Women"
    //         },
    //         {
    //             "id": 3,
    //             "name": "Kids"
    //         }
    //     ],
    // },
    // {
    //     id: 10,
    //     name: 'Moonlit Path Dojo',
    //     location: {
    //         address: '121 Dummy Street',
    //         city: 'Agege',
    //         state: 'lagos',
    //     },
    //     image: image3,
    //     average_rating: 4.85,
    //     activity_hours: {
    //         opening_time: '08:00',
    //         closing_time: '20:00',
    //         days: 'Mondays - Saturdays'
    //     },
    //     free_lesson_available: true,
    //     is_featured: true,
    //     price: 100,
    //     place_styles: [
    //         {
    //             "id": 1,
    //             "name": "Judo"
    //         },
    //         {
    //             "id": 2,
    //             "name": "capoeira"
    //         }
    //     ],
    //     place_caters_to: [
    //         {
    //             "id": 1,
    //             "name": "Men"
    //         },
    //         {
    //             "id": 2,
    //             "name": "Women"
    //         },
    //         {
    //             "id": 3,
    //             "name": "Kids"
    //         }
    //     ],
    // },
]