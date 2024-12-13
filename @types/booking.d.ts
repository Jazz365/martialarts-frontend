enum BookingStatus {
    pending,
    confirmed,
    cancelled,
}

type IBooking = {
    id: number;
    user: string;
    place: IPlace;
    date: string;
    time: string;
    status: keyof typeof BookingStatus;
    created_at: string;
}