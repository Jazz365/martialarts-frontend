type PageParams = Promise<{ 
    type?: string;
    placeId?: number;
    bookingId?: number;
    slug?: string;
}>;

type ApiError = {
    detail: string;
}