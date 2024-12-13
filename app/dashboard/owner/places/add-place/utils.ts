import { getAllDaysOfTheWeek } from "@/helpers/helpers";
import { v4 as uuidv4 } from 'uuid';

export interface NewPlaceDetail {
    name: string;
    description: string;
    price: string;
    email: string;
    phone_number: string;
    website: string;
    category: string;
    benefits: string[];
    locations: ILocation[];
    master_images: IPlaceMasterImage[];
    activity_hours: IPlaceActivityHours[];
    faqs: IPlaceFaq[];
    images: IPlaceImage[];
    video: string;
    type_of_place: number | null;
    free_lesson_available: boolean;
    styles: number[];
    gender: string;
    caters_to: number[];
    policy: string;
    reviews: IPlaceReviews[];
}

export const compulsoryDetailKeys = [
    'name',
    'description',
    'category',
    'type_of_place',
    'gender',
    'email',
    'locations',
    'benefits',
    'policy',
    // 'master_images',
]

export const initialNewPlaceDetail: NewPlaceDetail = {
    name: '',
    description: '',
    price: '',
    email: '',
    phone_number: '',
    website: '',
    category: '',
    benefits: [],
    locations: [],
    master_images: [],
    activity_hours: getAllDaysOfTheWeek().map(day => {
        return {
            id: uuidv4(),
            day,
            opening_time: '09:00',
            closing_time: '17:00',
        }
    }),
    faqs: [],
    images: [],
    video: '',
    type_of_place: null,
    free_lesson_available: false,
    styles: [],
    gender: '',
    caters_to: [],
    policy: '',
    reviews: [
        {
            "rating": 5,
            "comment": "Excellent training!",
            "user": 1 
        }
    ],
};

export const rateOptions = [
    'month',
    'hour',
]

export const formatNewPlaceDetailsForPosting = (details: NewPlaceDetail, categories: ICategory[]) => {
    return Object.keys(details).map(key => {
        const value = details[key as keyof NewPlaceDetail];
        
        if (key === 'activity_hours' || key === 'faqs' || key === 'images' || key === 'master_images' || key === 'locations') {
            const valueFormatted = value as IPlaceActivityHours[] | IPlaceFaq[] | IPlaceImage[] | IPlaceMasterImage[] | ILocation[];
            const updatedValue = valueFormatted.map(item => {
                const { id, ...rest } = item;

                if (key === 'images' || key === 'master_images') {
                    const itemValue = rest as IPlaceImage | IPlaceMasterImage;

                    if (itemValue.imageFile) {
                        itemValue.image = itemValue.imageFile;
                        delete itemValue.imageFile;
                    }

                    return {
                        ...itemValue
                    }
                }
                
                return {
                    ...rest
                }
            });

            return {
                [key]: updatedValue
            }
        }

        if (key === 'benefits') {
            const valueFormatted = value as string[];
            return {
                [key]: valueFormatted.join(', ')
            }
        }

        if (key === 'category') {
            const foundCategory = categories.find(category => category.id === Number(value));
            return {
                [key]: {
                    id: foundCategory?.id,
                    name: foundCategory?.name,
                }
            }
        }

        if (key === 'policy') {
            return {
                [key]: {
                    content: value,
                },
            }
        }

        return {
            [key]: value
        };
    }).reduce<{ [key: string]: any }>((acc, current) => {
        return { ...acc, ...current };
    }, {});
}
