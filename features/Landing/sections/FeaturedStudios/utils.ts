import { StaticImageData } from 'next/image';
import image1 from '../../../../assets/places/3d-japanese-hall-karate-training.webp';
import image2 from '../../../../assets/places/byodo-temple-kyoto-japan.webp';
import image3 from '../../../../assets/places/front-view-japanese-temple-structure.webp';
import image4 from '../../../../assets/places/kinkakuji-temple.webp';

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
}[] = [
    {
        id: 1,
        name: 'Shaolin Arts Prime Dojo',
        location: {
            address: '101 Dummy Street',
            city: 'Surulere',
            state: 'lagos',
        },
        image: image1,
        average_rating: 4.95,
        activity_hours: {
            opening_time: '08:00',
            closing_time: '20:00',
            days: 'Mondays - Fridays'
        },
        free_lesson_available: true,
        is_featured: true,
        price: 100,
    },
    {
        id: 2,
        name: 'Silent Hollow',
        location: {
            address: '105 Dummy Street',
            city: 'Surulere',
            state: 'lagos',
        },
        image: image2,
        average_rating: 4.85,
        activity_hours: {
            opening_time: '08:00',
            closing_time: '20:00',
            days: 'Mondays - Fridays'
        },
        free_lesson_available: true,
        is_featured: true,
        price: 100,
    },
    {
        id: 3,
        name: 'Bloodrock Peak',
        location: {
            address: '106 Dummy Street',
            city: 'Surulere',
            state: 'lagos',
        },
        image: image3,
        average_rating: 4.85,
        activity_hours: {
            opening_time: '08:00',
            closing_time: '20:00',
            days: 'Mondays - Saturdays'
        },
        free_lesson_available: true,
        is_featured: true,
        price: 100,
    },
    {
        id: 4,
        name: 'Shadow Vale',
        location: {
            address: '108 Dummy Street',
            city: 'Surulere',
            state: 'lagos',
        },
        image: image4,
        average_rating: 4.5,
        activity_hours: {
            opening_time: '08:00',
            closing_time: '20:00',
            days: 'Mondays - Fridays'
        },
        free_lesson_available: true,
        is_featured: true,
        price: 100,
    },
    {
        id: 5,
        name: 'Wood Vale',
        location: {
            address: '118 Dummy Street',
            city: 'Surulere',
            state: 'lagos',
        },
        image: image4,
        average_rating: 4.45,
        activity_hours: {
            opening_time: '08:00',
            closing_time: '20:00',
            days: 'Mondays - Fridays'
        },
        free_lesson_available: true,
        is_featured: true,
        price: 100,
    },
    {
        id: 6,
        name: 'Iron Lotus Temple',
        location: {
            address: '128 Dummy Street',
            city: 'Apapa',
            state: 'lagos',
        },
        image: image3,
        average_rating: 4.62,
        activity_hours: {
            opening_time: '08:00',
            closing_time: '20:00',
            days: 'Mondays - Fridays'
        },
        free_lesson_available: true,
        is_featured: true,
        price: 120,
    },
    {
        id: 7,
        name: 'The Silent Fist Monastery',
        location: {
            address: '8 Dummy Street',
            city: 'Bariga',
            state: 'lagos',
        },
        image: image2,
        average_rating: 4.5,
        activity_hours: {
            opening_time: '08:00',
            closing_time: '20:00',
            days: 'Mondays - Fridays'
        },
        free_lesson_available: true,
        is_featured: true,
        price: 100,
    },
    {
        id: 8,
        name: 'The Eternal Flame School',
        location: {
            address: '108 Dummy Street',
            city: 'Surulere',
            state: 'lagos',
        },
        image: image1,
        average_rating: 4.5,
        activity_hours: {
            opening_time: '08:00',
            closing_time: '20:00',
            days: 'Mondays - Saturdays'
        },
        free_lesson_available: true,
        is_featured: true,
        price: 100,
    },
    {
        id: 9,
        name: 'Sunfire Temple',
        location: {
            address: '131 Dummy Street',
            city: 'Surulere',
            state: 'lagos',
        },
        image: image2,
        average_rating: 4.5,
        activity_hours: {
            opening_time: '08:00',
            closing_time: '20:00',
            days: 'Mondays - Fridays'
        },
        free_lesson_available: true,
        is_featured: true,
        price: 100,
    },
    {
        id: 10,
        name: 'Moonlit Path Dojo',
        location: {
            address: '121 Dummy Street',
            city: 'Agege',
            state: 'lagos',
        },
        image: image3,
        average_rating: 4.85,
        activity_hours: {
            opening_time: '08:00',
            closing_time: '20:00',
            days: 'Mondays - Saturdays'
        },
        free_lesson_available: true,
        is_featured: true,
        price: 100,
    },
]