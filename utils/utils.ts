import taekwondo from '../assets/artStyles/taekwondo.webp'
import judo from '../assets/artStyles/judo.webp'
import taichi from '../assets/artStyles/tai-chi.webp'
import karate from '../assets/artStyles/karate.webp'
import aikido from '../assets/artStyles/aikido.webp'
import { StaticImageData } from 'next/image'

export const dummyMartialStyles: {
    id: number;
    name: string;
    imageUrl: StaticImageData;
}[] = [
    {
        id: 1,
        name: 'taekwondo',
        imageUrl: taekwondo,
    },
    {
        id: 2,
        name: 'judo',
        imageUrl: judo,
    },
    {
        id: 3,
        name: 'tai chi',
        imageUrl: taichi,
    },
    {
        id: 4,
        name: 'karate',
        imageUrl: karate,
    },
    {
        id: 5,
        name: 'aikido',
        imageUrl: aikido,
    },
]