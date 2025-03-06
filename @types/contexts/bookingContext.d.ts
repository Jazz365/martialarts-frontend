type BookingContextType = {
    bookings: IBooking[];
    setBookings: (val: IBooking[]) => void;
    bookingsLoading: boolean;
    setBookingsLoading: (val: boolean) => void;
    bookingsLoaded: boolean;
    setBookingsLoaded: (val: boolean) => void;
    userBookedPlaces: IPlace[];
    resetBookingContext: () => void;
}