'use client';

import BookingForm from "@/components/common/BookingForm/BookingForm";
import useLoadData from "@/hooks/useLoadData";
import { BookingService } from "@/services/bookingService";
import { PlaceService } from "@/services/placeService";
import { createContext, useContext, useMemo, useState } from "react";
import { useUserContext } from "../UserContext";
import { BlogService } from "@/services/blogService";
import { MapService } from "@/services/mapService";
import { initialAppContext } from "./utils";
import { AppConstants } from "@/utils/constants";

const AppContext = createContext<AppContextType>(initialAppContext);

export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { userDetails } = useUserContext();

    const [ selectedPlaceId, setSelectedPlaceId ] = useState<number | null>(null);

    const [ allStyles, setAllStyles ] = useState<IMartialArtStyle[]>([]);
    const [ stylesLoading, setStylesLoading ] = useState(true);
    const [ stylesLoaded, setStylesLoaded ] = useState(false);

    const [ catersTo, setCatersTo ] = useState<ICatersTo[]>([]);
    const [ catersToLoading, setCatersToLoading ] = useState(true);
    const [ catersToLoaded, setCatersToLoaded ] = useState(false);

    const [ placeTypes, setPlaceTypes ] = useState<IPlaceType[]>([]);
    const [ placeTypesLoading, setPlaceTypesLoading ] = useState(true);
    const [ placeTypesLoaded, setPlaceTypesLoaded ] = useState(false);

    const [ userPlaces, setUserPlaces ] = useState<IPlace[]>([]);
    const [ userPlacesLoading, setUserPlacesLoading ] = useState(true);
    const [ userPlacesLoaded, setUserPlacesLoaded ] = useState(false);
    
    const [ bookings, setBookings ] = useState<IBooking[]>([]);
    const [ bookingsLoading, setBookingsLoading ] = useState(true);
    const [ bookingsLoaded, setBookingsLoaded ] = useState(false);
    
    const [ blogs, setBlogs ] = useState<IBlog[]>([]);
    const [ blogsLoading, setBlogsLoading ] = useState(true);
    const [ blogsLoaded, setBlogsLoaded ] = useState(false);

    const [ placesViewStats, setPlacesViewStats ] = useState<IPlaceViewStat[]>([]);
    const [ placesViewStatLoading, setPlacesViewStatLoading ] = useState(true);
    const [ placesViewStatLoaded, setPlacesViewStatLoaded ] = useState(false);

    const [ ageGroups, setAgeGroups ] = useState<IPlaceAgeGroups[]>([]);
    const [ ageGroupsLoading, setAgeGroupsLoading ] = useState(true);
    const [ ageGroupsLoaded, setAgeGroupsLoaded ] = useState(false);

    const [ showPaymentModal, setShowPaymentModal ] = useState(false);

    const userBookedPlaces = useMemo<IPlace[]>(() => {
        return bookings.filter(booking => booking.status === 'confirmed').flatMap(booking => [booking.place]);
    }, [bookings]);
    
    const [ showMap, setShowMap ] = useState(true);
    
    const [ mapKey, setMapKey ] = useState('');
    const [ mapKeyLoaded, setMapKeyLoaded ] = useState(false);
    const [ mapKeyLoading, setMapKeyLoading ] = useState(true);

    const [
        placeService,
        bookingService,
        blogService,
        mapService,
    ] = [
        new PlaceService(),
        new BookingService(),
        new BlogService(),
        new MapService(),
    ];

    const resetUserInfoInContext = () => {
        setUserPlaces([]);
        setUserPlacesLoaded(false);
        setUserPlacesLoading(true);

        setBookings([]);
        setBookingsLoaded(false);
        setBookingsLoading(true);

        setPlacesViewStats([]);
        setPlacesViewStatLoaded(false);
        setPlacesViewStatLoading(true);
    }
    
    useLoadData(
        stylesLoaded,
        setStylesLoading,
        placeService.getAllStyles.bind(placeService),
        setAllStyles,
        setStylesLoaded,
    );

    useLoadData(
        userPlacesLoaded,
        setUserPlacesLoading,
        placeService.getUserPlaces.bind(placeService),
        setUserPlaces,
        setUserPlacesLoaded,
        {
            authorisationRequired: true,
            hasDependency: true,
            dependency: userDetails !== null && stylesLoaded === true,
        },
    );

    useLoadData(
        catersToLoaded,
        setCatersToLoading,
        placeService.getAllCatersTo.bind(placeService),
        setCatersTo,
        setCatersToLoaded,
        {
            hasDependency: true,
            dependency:  stylesLoaded === true
        },
    );

    useLoadData(
        ageGroupsLoaded,
        setAgeGroupsLoading,
        placeService.getAllAgeGroups.bind(placeService),
        setAgeGroups,
        setAgeGroupsLoaded,
        {
            hasDependency: true,
            dependency:  stylesLoaded === true
        },
    );

    useLoadData(
        placeTypesLoaded,
        setPlaceTypesLoading,
        placeService.getAllPlaceTypes.bind(placeService),
        setPlaceTypes,
        setPlaceTypesLoaded,
        {
            hasDependency: true,
            dependency:  stylesLoaded === true
        },
    );

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
        }
    );

    useLoadData(
        placesViewStatLoaded,
        setPlacesViewStatLoading,
        placeService.getPlaceViewStats.bind(placeService),
        setPlacesViewStats,
        setPlacesViewStatLoaded,
        {
            authorisationRequired: true,
            hasDependency: true,
            dependency: userDetails !== null && userDetails.is_owner === true && stylesLoaded === true,
        }
    );

    useLoadData(
        blogsLoaded,
        setBlogsLoading,
        blogService.getAllBlogs.bind(blogService),
        setBlogs,
        setBlogsLoaded,
        {
            hasDependency: true,
            dependency:  stylesLoaded === true
        },
    );

    useLoadData(
        mapKeyLoaded,
        setMapKeyLoading,
        mapService.getMapDetail.bind(mapService),
        setMapKey,
        setMapKeyLoaded,
        {
            saveResToLocalStorage: true,
            resKeyInlocalStorage: AppConstants.mapKey,
        },
    );

    return <>
        <AppContext.Provider value={{
            selectedPlaceId,
            setSelectedPlaceId,
            allStyles,
            setAllStyles,
            stylesLoaded,
            setStylesLoaded,
            stylesLoading,
            setStylesLoading,
            catersTo,
            setCatersTo,
            catersToLoaded,
            setCatersToLoaded,
            catersToLoading,
            setCatersToLoading,
            placeTypes,
            setPlaceTypes,
            placeTypesLoaded,
            setPlaceTypesLoaded,
            placeTypesLoading,
            setPlaceTypesLoading,
            userPlaces,
            setUserPlaces,
            userPlacesLoaded,
            setUserPlacesLoaded,
            userPlacesLoading,
            setUserPlacesLoading,
            bookings,
            setBookings,
            bookingsLoaded,
            setBookingsLoaded,
            bookingsLoading,
            setBookingsLoading,
            placesViewStats,
            setPlacesViewStats,
            placesViewStatLoaded,
            setPlacesViewStatLoaded,
            placesViewStatLoading,
            setPlacesViewStatLoading,
            blogs,
            setBlogs,
            blogsLoaded,
            setBlogsLoaded,
            blogsLoading,
            setBlogsLoading,
            showMap,
            setShowMap,
            userBookedPlaces,
            mapKey,
            setMapKey,
            mapKeyLoaded,
            setMapKeyLoaded,
            mapKeyLoading,
            setMapKeyLoading,
            ageGroups,
            setAgeGroups,
            ageGroupsLoaded,
            setAgeGroupsLoaded,
            ageGroupsLoading,
            setAgeGroupsLoading,
            showPaymentModal,
            setShowPaymentModal,
            resetUserInfoInContext,
        }}>
            {children}

            {
                selectedPlaceId &&
                <BookingForm />
            }
            
        </AppContext.Provider>
    </>
}

export default AppContextProvider;