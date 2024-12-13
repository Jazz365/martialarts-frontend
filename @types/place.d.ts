type IPlace = {
    id: number;
    owner: string;
    name: string;
    description: string;
    category: ICategory;
    website: string;
    phone_number: string;
    video: string;
    free_lesson_available: boolean;
    is_featured: boolean;
    created_at: string;
    average_rating: number,
    locations: ILocation[];
    images: IPlaceImage[];
    master_images: IPlaceMasterImage[];
    faqs: IPlaceFaq[];
    policy: IPlacePolicy;
    activity_hours: IPlaceActivityHours[];
    reviews: IPlaceReviews[];
    benefits: string[];
    price: number;
}

type IPlaceImage = {
    id: number | string;
    image: string | File;
    imageFile?: File;
    uploaded_at?: string;
}

type IPlaceMasterImage = {
    id?: number | string;
    name: string;
    image: string | File;
    bio: string;
    imageFile?: File;
}

type IPlaceFaq = {
    id?: number | string;
    question: string;
    answer: string;
}

type IPlacePolicy = {
    id: number;
    content: string;
    document: string;
}

type IPlaceActivityHours = {
    id?: number | string;
    day: string;
    opening_time: string;
    closing_time: string;
}

type IPlaceReviews = {
    id?: number;
    user: string | number;
    rating: number;
    comment: string;
    created_at?: string;
}