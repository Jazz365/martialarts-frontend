import taekwondo from '../assets/artStyles/taekwondo.webp'
import judo from '../assets/artStyles/judo.webp'
import taichi from '../assets/artStyles/tai-chi.webp'
import karate from '../assets/artStyles/karate.webp'
import aikido from '../assets/artStyles/aikido.webp'
import wrestling from '../assets/artStyles/wrestling.webp'
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
        name: 'judo',
        imageUrl: judo,
        isFeatured: true,
        isTrending: true,
    },
    {
        id: 2,
        name: 'taekwondo',
        imageUrl: taekwondo,
        isFeatured: true,
        isTrending: true,
    },
    {
        id: 3,
        name: 'tai chi',
        imageUrl: taichi,
        isFeatured: true,
        isTrending: false,
    },
    {
        id: 4,
        name: 'karate',
        imageUrl: karate,
        isFeatured: true,
        isTrending: true,
    },
    {
        id: 5,
        name: 'wrestling',
        imageUrl: wrestling,
        isFeatured: true,
        isTrending: true,
    },
    {
        id: 6,
        name: 'aikido',
        imageUrl: aikido,
        isFeatured: true,
        isTrending: false,
    },
    {
        id: 7,
        name: 'kung fu',
        imageUrl: taekwondo,
        isFeatured: false,
        isTrending: true,
    },
    {
        id: 8,
        name: 'muay thai',
        imageUrl: taekwondo,
        isFeatured: false,
        isTrending: false,
    },
    {
        id: 9,
        name: 'wing chun',
        imageUrl: taekwondo,
        isFeatured: false,
        isTrending: false,
    },
    {
        id: 10,
        name: 'sambo',
        imageUrl: taekwondo,
        isFeatured: false,
        isTrending: false,
    },
    {
        id: 11,
        name: 'tang soo do',
        imageUrl: taekwondo,
        isFeatured: false,
        isTrending: false,
    },
    {
        id: 12,
        name: 'capoeira',
        imageUrl: taekwondo,
        isFeatured: false,
        isTrending: false,
    },
]