import { base64ToFile, convertFileObjectToBinaryStr, getAllDaysOfTheWeek, getExtensionFromMimeType } from "@/helpers/helpers";
import { v4 as uuidv4 } from 'uuid';

export const SAVED_PLACE_DETAIL_IN_STORAGE = 'saved-place-detail';

const pricingTypesDict = {
    monthlyPricing: 'monthly',
    classPricing: 'per class',
    privatePricing: 'private',
}

export const pricingTypes = Object.keys(pricingTypesDict).map(key => {
    return pricingTypesDict[key as keyof typeof pricingTypesDict]
});

export const formatPricingType = (type: string) => {
    const typeInLower = type.toLowerCase();

    if (typeInLower === pricingTypesDict.monthlyPricing) return 'month';
    if (typeInLower === pricingTypesDict.classPricing) return 'class';
    if (typeInLower === pricingTypesDict.privatePricing) return 'private';

    return 'month';
}

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
    age_groups: number[];
    place_policy: IPlacePolicy;
    reviews: {}[];
    is_featured: boolean;
    documents: IPlaceDocuments[];
    class_schedules_data: IPlaceClassSchedule[];
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
    age_groups: 'age_groups',
    place_policy: 'place_policy',
    reviews: 'reviews',
    is_featured: 'is_featured',
    documents: 'documents',
    class_schedules_data: 'class_schedules_data',
}

export const compulsoryDetailKeys = [
    newPlaceDetailKeysDict.name,
    newPlaceDetailKeysDict.description,
    newPlaceDetailKeysDict.type_of_place,
    newPlaceDetailKeysDict.pricing_type,
    newPlaceDetailKeysDict.locations,
    newPlaceDetailKeysDict.benefits,
    newPlaceDetailKeysDict.images,
    newPlaceDetailKeysDict.gender,
    newPlaceDetailKeysDict.caters_to,
    newPlaceDetailKeysDict.age_groups,
    newPlaceDetailKeysDict.email,
    // newPlaceDetailKeysDict.policy,
    // newPlaceDetailKeysDict.faqs,
]

export const compulsoryDetailKeysDict = {
    [newPlaceDetailKeysDict.name]: 'place name',
    [newPlaceDetailKeysDict.description]: 'place description',
    [newPlaceDetailKeysDict.type_of_place]: 'place type',
    [newPlaceDetailKeysDict.pricing_type]: 'pricing type',
    [newPlaceDetailKeysDict.gender]: 'place gender offering',
    [newPlaceDetailKeysDict.email]: 'contact email',
    [newPlaceDetailKeysDict.locations]: 'place location(s)',
    [newPlaceDetailKeysDict.benefits]: 'place benefits',
    // newPlaceDetailKeysDict.policy,
    // newPlaceDetailKeysDict.faqs,
    [newPlaceDetailKeysDict.images]: 'place image(s)',
    [newPlaceDetailKeysDict.caters_to]: 'place class type(s)',
    [newPlaceDetailKeysDict.age_groups]: 'place age group(s)',
}

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
    age_groups: [],
    place_policy: { content: '' },
    reviews: [
        {
            "rating": 5,
            "comment": "Excellent training!",
            "user": 1 
        }
    ],
    is_featured: false,
    documents: [],
    class_schedules_data: [],
};

export const rateOptions = [
    'month',
    'hour',
]

export const cleanNewPlaceDetailForStorageSaveOperation = async (details: NewPlaceDetail): Promise<NewPlaceDetail> => {
    const copyOfDetails: NewPlaceDetail = JSON.parse(JSON.stringify(details));

    copyOfDetails.documents = await Promise.all(details.documents.map(async (doc) => {
        const copyOfDoc = {...doc};
        if (copyOfDoc.file && copyOfDoc.file instanceof File) {
            try {
                copyOfDoc.fileBase64Str = await convertFileObjectToBinaryStr(copyOfDoc.file) as string;
            } catch (error) {}

            delete copyOfDoc.file;
        }

        return copyOfDoc;
    }));

    copyOfDetails.images = details.images.map(image => {
        const copyOfImage = { ...image };
        if (copyOfImage.imageFile && copyOfImage.imageFile instanceof File) delete copyOfImage.imageFile;
        return copyOfImage;
    });

    copyOfDetails.master_images = details.master_images.map(masterItem => {
        const copyOfMasterItem = { ...masterItem };
        if (copyOfMasterItem.imageFile && copyOfMasterItem.imageFile instanceof File) delete copyOfMasterItem.imageFile;
        return copyOfMasterItem;
    });

    return copyOfDetails;
}

export const formatSavedNewPlaceDetailInStorage = (details: NewPlaceDetail): NewPlaceDetail => {
    const copyOfDetails: NewPlaceDetail = JSON.parse(JSON.stringify(details));

    copyOfDetails.documents = details.documents.map((item) => {
        const copyOfItem = {...item};
        if (item.fileBase64Str && item.fileBase64Str?.length > 0 && item.fileType && item.fileType?.length > 0) {
            try {
                copyOfItem.file = base64ToFile(item.fileBase64Str, item.title, item.fileType);
            } catch (error) {}
        }
        return copyOfItem;
    });

    copyOfDetails.images = details.images.map((item) => {
        const copyOfItem = {...item};
        const imageBase64Str = item.image as string;
        if (imageBase64Str && imageBase64Str?.length > 0 && item.imageFileType && item.imageFileType?.length > 0) {
            try {
                const fileExtension = getExtensionFromMimeType(item.imageFileType);
                copyOfItem.imageFile = base64ToFile(imageBase64Str, `${item.id}.${fileExtension}`, item.imageFileType);
            } catch (error) {}
        }
        return copyOfItem;
    });

    copyOfDetails.master_images = details.master_images.map((item) => {
        const copyOfItem = {...item};
        const imageBase64Str = item.image as string;
        if (imageBase64Str && imageBase64Str?.length > 0 && item.imageFileType && item.imageFileType?.length > 0) {
            try {
                const fileExtension = getExtensionFromMimeType(item.imageFileType);
                copyOfItem.imageFile = base64ToFile(imageBase64Str, `${item.id}.${fileExtension}`, item.imageFileType);
            } catch (error) {}
        }
        return copyOfItem;
    });

    return copyOfDetails;
}

export const generateFormDataForNewPlaceDetails = (details: NewPlaceDetail, isEditView=false) => {
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
                        id,
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
            const currentValue = value as string[];
            const updatedValue = currentValue.map(item => item.trim());
            return {
                [key]: updatedValue.join('\n'),
            }
        }

        if (key === newPlaceDetailKeysDict.type_of_place || key === newPlaceDetailKeysDict.pricing) {
            const updatedValue = Number(value);
            return {
                [key]: updatedValue,
            }
        }

        // if (key === newPlaceDetailKeysDict.place_policy) {
        //     return {
        //         [key]: {
        //             content: value,
        //         },
        //     }
        // }

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

            if (isEditView === true) {
                formData.append('master_images_data_in', JSON.stringify(masterImagesDetails.map(item => {
                    if (typeof item.id === 'number') {
                        return { 
                            id: item.id,
                            name: item.name, 
                            bio: item.bio,
                            action: 'update',
                        }
                    }

                    return { 
                        name: item.name, 
                        bio: item.bio,
                        action: 'create',
                    }
                })))
            } else {
                formData.append('master_images_bio', JSON.stringify(masterImagesDetails.map(item => ({ name: item.name, bio: item.bio }))))
            }
            // const existingMasterImages = masterImagesDetails.filter(item => typeof item.id === 'number' && typeof item.image === 'string');
            // let newImageStartIndex = 1;

            masterImagesDetails.forEach((item, index) => {
                if (isEditView === true) {
                    formData.append(`master_image_new_${index + 1}`, item.image as File);
                
                    if (typeof item.id === 'number' && typeof item.image === 'string') {
                        formData.append(`master_image_${item.id}`, item.image as string);
                    }
                } else {
                    formData.append(`${key}`, item.image as File);
                }
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

            if (isEditView === true) {
                const imagesToKeep = imagesDetail.filter(item => typeof item.id === 'number' && typeof item.image === 'string');
                formData.append('current_place_images', JSON.stringify(imagesToKeep.map(item => item.id)));
            }
            
            continue;
        }

        if (key === newPlaceDetailKeysDict.documents) {
            const documentDetail = value as IPlaceDocuments[];

            documentDetail.forEach((item, index) => {
                if (item.file && item.file instanceof File) {
                    formData.append(`${key}[${index}]`, item.file as File)
                }
            });

            const documentLinks = documentDetail.filter(doc => doc.document_type == 'link').map(doc => {
                return {
                    title: doc.title,
                    url: doc.document_link,
                }
            });
            formData.append('document_links', JSON.stringify(documentLinks));

            if (isEditView === true) {
                const documentsToKeep = documentDetail.filter(item => typeof item.id === 'number');
                formData.append('current_documents', JSON.stringify(documentsToKeep.map(item => item.id)));
            }

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

        if (key === newPlaceDetailKeysDict.class_schedules_data) {
            formData.append('class_schedules', JSON.stringify(value));
            continue;
        }

        if (
            key === newPlaceDetailKeysDict.styles || 
            key === newPlaceDetailKeysDict.caters_to || 
            key === newPlaceDetailKeysDict.place_policy || 
            key === newPlaceDetailKeysDict.reviews || 
            key === newPlaceDetailKeysDict.age_groups
        ) {
            formData.append(key, JSON.stringify(value));
            continue;
        }

        if (key === 'documents_data') continue;

        formData.append(key, value);
    }
    
    return formData;
}

export const saveFormDataToFile = (formData: FormData) => {
    let dataStr = "";

    // Loop through the FormData and format the data as a string
    formData.forEach((value, key) => {
        dataStr += `${key}: ${value}\n`;
    });

    // Create a Blob from the string data
    const blob = new Blob([dataStr], { type: 'text/plain' });

    // Create a temporary link to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'formData.txt';

    // Simulate a click on the link to download the file
    link.click();

    // Cleanup: Revoke the object URL and remove the link from the document
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
}