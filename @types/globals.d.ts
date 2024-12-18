type PageParams = Promise<{ 
    type?: string;
    placeId?: number;
    bookingId?: number;
}>;

type ApiError = {
    detail: string;
}