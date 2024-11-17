import { StaticImageData } from "next/image";
import sampleImage1 from '../../../../assets/blogSamples/surprised-puzzled-african-american-lady.webp';
import sampleImage2 from '../../../../assets/blogSamples/pictures-hand.webp';
import sampleImage3 from '../../../../assets/blogSamples/freedom-concept-with-hiker-mountain.webp';

export const dummyBlogArticles: {
    name: string;
    createdAt: Date;
    lengthOfReadInMinutes: number;
    image: StaticImageData;
    link: string;
} [] = [
    {
        name: '5 Key Factors to Consider When Choosing a Martial Arts School Near You',
        createdAt: new Date(),
        lengthOfReadInMinutes: 5,
        image: sampleImage1,
        link: '',
    },
    {
        name: 'The Ultimate Guide to Understanding the Differences Between Karate, Taekwondo, and Kung Fu',
        createdAt: new Date(),
        lengthOfReadInMinutes: 10,
        image: sampleImage2,
        link: '',
    },
    {
        name: "Why Martial Arts Training is More Than Just Physical—The Mental Benefits You Didn't Know About",
        createdAt: new Date(),
        lengthOfReadInMinutes: 7,
        image: sampleImage3,
        link: '',
    },
]