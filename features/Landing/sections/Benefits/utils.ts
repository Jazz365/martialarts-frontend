import { IconType } from "react-icons";
import { GrMapLocation } from "react-icons/gr";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineGroups2 } from "react-icons/md";

export const benefitsList: {
    icon: IconType;
    title: string;
    info: string;
}[] = [
    {
        icon: IoIosSearch,
        title: 'Discover Martial Arts Styles',
        info: 'Browse a wide variety of martial arts styles and find the one that suits your goals. From self-defense to fitness, explore detailed descriptions, images, and more.'
    },
    {
        icon: GrMapLocation,
        title: 'Find Nearby Training Centers',
        info: "Easily search for martial arts schools, dojos, and training centers near you. With our location-based filters, you'll quickly find top-rated places to start your journey",
    },
    {
        icon: MdOutlineGroups2,
        title: 'Tailored Options for Everyone',
        info: "Whether you're a woman, man, or minor, find martial arts options specifically tailored for your needs. We’ve curated categories to help everyone from beginners to advanced students.",
    }
]