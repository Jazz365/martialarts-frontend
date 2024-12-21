import { getAllDaysOfTheWeek } from "@/helpers/helpers";
import { v4 as uuidv4 } from 'uuid';

export const pricingTypes = [
    'monthly',
    'per class',
    'private'
]

export interface NewPlaceDetail {
    name: string;
    description: string;
    pricing: number;
    pricing_type: string;
    email: string;
    phone_number: string;
    website?: string;
    benefits: string[];
    locations: ILocation[];
    master_images: IPlaceMasterImage[];
    activity_hours: IPlaceActivityHours[];
    faqs: IPlaceFaq[];
    images: IPlaceImage[];
    video?: string;
    type_of_place: number | null;
    free_lesson_available: boolean;
    styles: number[];
    gender: string;
    caters_to: number[];
    policy: string;
    reviews: IPlaceReviews[];
    is_featured: boolean;
}

export const newPlaceDetailKeysDict = {
    name: 'name',
    description: 'description',
    pricing: 'pricing',
    pricing_type: 'pricing_type',
    email: 'email',
    phone_number: 'phone_number',
    website: 'website',
    benefits: 'benefits',
    locations: 'locations',
    master_images: 'master_images',
    activity_hours: 'activity_hours',
    opening_time: 'opening_time',
    closing_time: 'closing_time',
    faqs: 'faqs',
    images: 'images',
    video: 'video',
    type_of_place: 'type_of_place',
    free_lesson_available: 'free_lesson_available',
    styles: 'styles',
    gender: 'gender',
    caters_to: 'caters_to',
    policy: 'policy',
    reviews: 'reviews',
    is_featured: 'is_featured',
}

export const compulsoryDetailKeys = [
    newPlaceDetailKeysDict.name,
    newPlaceDetailKeysDict.description,
    newPlaceDetailKeysDict.type_of_place,
    newPlaceDetailKeysDict.pricing_type,
    newPlaceDetailKeysDict.gender,
    newPlaceDetailKeysDict.email,
    newPlaceDetailKeysDict.locations,
    newPlaceDetailKeysDict.benefits,
    newPlaceDetailKeysDict.policy,
    newPlaceDetailKeysDict.faqs,
    newPlaceDetailKeysDict.images,
]

export const initialNewPlaceDetail: NewPlaceDetail = {
    name: '',
    description: '',
    pricing: 0,
    pricing_type: '',
    email: '',
    phone_number: '',
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
    is_featured: false,
};

export const rateOptions = [
    'month',
    'hour',
]

export const generateFormDataForNewPlaceDetails = (details: NewPlaceDetail) => {
    const formattedDetails = Object.keys(details).map(key => {
        const value = details[key as keyof NewPlaceDetail];
        
        if (key === newPlaceDetailKeysDict.activity_hours || key === newPlaceDetailKeysDict.faqs || key === newPlaceDetailKeysDict.images || key === newPlaceDetailKeysDict.master_images || key === newPlaceDetailKeysDict.locations) {
            const valueFormatted = value as IPlaceActivityHours[] | IPlaceFaq[] | IPlaceImage[] | IPlaceMasterImage[] | ILocation[];
            const updatedValue = valueFormatted.map(item => {
                const { id, ...rest } = item;

                if (key === newPlaceDetailKeysDict.images || key === newPlaceDetailKeysDict.master_images) {
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

        if (key === newPlaceDetailKeysDict.benefits) {
            const updatedValue = value as string[];
            return {
                [key]: updatedValue.join(', '),
            }
        }

        if (key === newPlaceDetailKeysDict.type_of_place || key === newPlaceDetailKeysDict.pricing) {
            const updatedValue = Number(value);
            return {
                [key]: updatedValue,
            }
        }

        if (key === newPlaceDetailKeysDict.policy) {
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

    
    const formData = new FormData();

    for (const key in formattedDetails) {
        const value = formattedDetails[key];
        if (key === newPlaceDetailKeysDict.master_images) {
            const masterImagesDetails = value as IPlaceMasterImage[];

            formData.append('master_images_bio', JSON.stringify(masterImagesDetails.map(item => ({ name: item.name, bio: item.bio }))))
            masterImagesDetails.forEach(item => {
                formData.append(`${key}`, item.image as File)
            });

            continue;
        }
        
        if (key === newPlaceDetailKeysDict.images) {
            const imagesDetail = value as IPlaceImage[];

            imagesDetail.forEach(item => {
                if (item.image instanceof File) {
                    formData.append(`${key}`, item.image as File)
                }
            });

            continue;
        }

        if (key === newPlaceDetailKeysDict.locations) {
            formData.append('locations_data', JSON.stringify(value));
            continue;
        }

        if (key === newPlaceDetailKeysDict.activity_hours) {
            formData.append('activity_hours_data', JSON.stringify(value));
            continue;
        }
        
        if (key === newPlaceDetailKeysDict.faqs) {
            formData.append('faqs_data', JSON.stringify(value));
            continue;
        }
        
        if (key === newPlaceDetailKeysDict.styles || key === newPlaceDetailKeysDict.caters_to || key === newPlaceDetailKeysDict.policy || key === newPlaceDetailKeysDict.reviews) {
            formData.append(key, JSON.stringify(value));
            continue;
        }

        formData.append(key, value);
    }
    
    return formData;
}
