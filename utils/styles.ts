import taekwondo from '../assets/artStyles/taekwondo.jpg'
import judo from '../assets/artStyles/judo.jpg'
import boxing from '../assets/artStyles/boxing.jpg'
import karate from '../assets/artStyles/karate.jpg'
import jiujustu from '../assets/artStyles/Jiu-Jitsu.jpg'
import wrestling from '../assets/artStyles/Wrestling.jpg'
import muaythai from '../assets/artStyles/Muay-Thai.jpg'
import capoeira from '../assets/artStyles/Capoeira.jpg'
import kickboxing from '../assets/artStyles/Kickboxing.jpg'
import { StaticImageData } from 'next/image'

export const dummyMartialStyles: {
    id: number;
    name: string;
    imageUrl: StaticImageData;
    isFeatured: boolean;
    isTrending: boolean;
}[] = [
    {
        id: 1,
        name: 'boxing',
        imageUrl: boxing,
        isFeatured: true,
        isTrending: true,
    },
    {
        id: 2,
        name: 'karate',
        imageUrl: karate,
        isFeatured: true,
        isTrending: true,
    },
    {
        id: 3,
        name: 'taekwondo',
        imageUrl: taekwondo,
        isFeatured: true,
        isTrending: true,
    },
    {
        id: 4,
        name: 'judo',
        imageUrl: judo,
        isFeatured: true,
        isTrending: true,
    },
    {
        id: 5,
        name: 'jiu-jistu',
        imageUrl: jiujustu,
        isFeatured: true,
        isTrending: false,
    },
    {
        id: 6,
        name: 'muay thai',
        imageUrl: muaythai,
        isFeatured: true,
        isTrending: false,
    },
    {
        id: 7,
        name: 'capoeira',
        imageUrl: capoeira,
        isFeatured: true,
        isTrending: false,
    },
    {
        id: 8,
        name: 'wrestling',
        imageUrl: wrestling,
        isFeatured: true,
        isTrending: true,
    },
    {
        id: 9,
        name: 'kickboxing',
        imageUrl: kickboxing,
        isFeatured: true,
        isTrending: true,
    },
    // {
    //     id: 10,
    //     name: 'boxing',
    //     imageUrl: boxing,
    //     isFeatured: true,
    //     isTrending: true,
    // },
    // {
    //     id: 11,
    //     name: 'karate',
    //     imageUrl: karate,
    //     isFeatured: true,
    //     isTrending: true,
    // },
    // {
    //     id: 12,
    //     name: 'taekwondo',
    //     imageUrl: taekwondo,
    //     isFeatured: true,
    //     isTrending: true,
    // },
]