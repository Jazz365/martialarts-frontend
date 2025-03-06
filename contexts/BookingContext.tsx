'use client'

import useLoadData from "@/hooks/useLoadData";
import { BookingService } from "@/services/bookingService";
import { createContext, useContext, useMemo, useState } from "react"
import { useUserContext } from "./UserContext";
import { useAppContext } from "./AppContext/AppContext";

const BookingContext = createContext<BookingContextType>({
    bookings: [],
    bookingsLoaded: false,
    bookingsLoading: true,
    setBookings: () => {},
    setBookingsLoaded: () => {},
    setBookingsLoading: () => {},
    userBookedPlaces: [],
    resetBookingContext: () => {},
});

export const useBookingContext = () => useContext(BookingContext);

const BookingContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { userDetails } = useUserContext();
    const { stylesLoaded } = useAppContext();

    const [ bookings, setBookings ] = useState<IBooking[]>([]);
    const [ bookingsLoading, setBookingsLoading ] = useState(true);
    const [ bookingsLoaded, setBookingsLoaded ] = useState(false);

    const userBookedPlaces = useMemo<IPlace[]>(() => {
        return bookings.filter(booking => booking.status === 'confirmed').flatMap(booking => [booking.place]);
    }, [bookings]);

    const bookingService = new BookingService();

    useLoadData(
        bookingsLoaded,
        setBookingsLoading,
        userDetails?.is_owner === true ?
            bookingService.getOwnerBookings.bind(bookingService)
        :
        bookingService.getUserBookings.bind(bookingService),
        setBookings,
        setBookingsLoaded,
        {
            authorisationRequired: true,
            hasDependency: true,
            dependency: userDetails !== null && stylesLoaded === true,
        },
    );

    const resetBookingContext = () => {
        setBookings([]);
        setBookingsLoaded(false);
        setBookingsLoading(true);
    }

    return <BookingContext.Provider value={{
        bookings,
        setBookings,
        bookingsLoaded,
        setBookingsLoaded,
        bookingsLoading,
        setBookingsLoading,
        userBookedPlaces,
        resetBookingContext,
    }}>
        {children}
    </BookingContext.Provider>
}

export default BookingContextProvider;