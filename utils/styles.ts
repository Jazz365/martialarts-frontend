import taekwondo from '../assets/artStyles/taekwondo.png'
import judo from '../assets/artStyles/judo.png'
import boxing from '../assets/artStyles/boxing.png'
import karate from '../assets/artStyles/karate.png'
import jiujustu from '../assets/artStyles/Jiu-Jitsu.png'
import wrestling from '../assets/artStyles/Wrestling.png'
import muaythai from '../assets/artStyles/Muai-thai.png'
import capoeira from '../assets/artStyles/Capoeira.png'
import kickboxing from '../assets/artStyles/Kick-boxing.png'
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
        name: 'jiu-justu',
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
]