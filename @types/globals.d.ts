type PageParams = Promise<{ 
    type?: string;
    placeId?: number;
}>;

type ApiError = {
    detail: string;
}