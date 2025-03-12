'use client'

import useLoadData from "@/hooks/useLoadData";
import { PlaceService } from "@/services/placeService";
import { createContext, useContext, useState } from "react"
import { useUserContext } from "./UserContext";
import { useAppContext } from "./AppContext/AppContext";
import BookingForm from "@/components/common/BookingForm/BookingForm";

const PlaceContext = createContext<PlaceContextType>({
    userPlaces: [],
    setUserPlaces: () => {},
    userPlacesLoading: true,
    setUserPlacesLoading: () => {},
    userPlacesLoaded: false,
    setUserPlacesLoaded: () => {},
    placesViewStats: [],
    placesViewStatLoaded: false,
    placesViewStatLoading: true,
    setPlacesViewStats: () => {},
    setPlacesViewStatLoaded: () => {},
    setPlacesViewStatLoading: () => {},
    selectedPlaceId: null, 
    setSelectedPlaceId: () => {},
    resetPlaceContext: () => {},
});

export const usePlaceContext = () => useContext(PlaceContext);

const PlaceContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const { userDetails } = useUserContext();
    const { stylesLoaded } = useAppContext();

    const [ userPlaces, setUserPlaces ] = useState<IPlace[]>([]);
    const [ userPlacesLoading, setUserPlacesLoading ] = useState(true);
    const [ userPlacesLoaded, setUserPlacesLoaded ] = useState(false);

    const [ placesViewStats, setPlacesViewStats ] = useState<IPlaceViewStat[]>([]);
    const [ placesViewStatLoading, setPlacesViewStatLoading ] = useState(true);
    const [ placesViewStatLoaded, setPlacesViewStatLoaded ] = useState(false);

    const [ selectedPlaceId, setSelectedPlaceId ] = useState<number | null>(null);

    const placeService = new PlaceService();

    const resetPlaceContext = () => {
        setUserPlaces([]);
        setUserPlacesLoaded(false);
        setUserPlacesLoading(true);

        setPlacesViewStats([]);
        setPlacesViewStatLoaded(false);
        setPlacesViewStatLoading(true);

        setSelectedPlaceId(null);
    }

    
    useLoadData(
        userPlacesLoaded,
        setUserPlacesLoading,
        placeService.getUserPlaces.bind(placeService),
        setUserPlaces,
        setUserPlacesLoaded,
        {
            authorisationRequired: true,
            hasDependency: true,
            dependency: userDetails !== null && userDetails.is_admin !== true && stylesLoaded === true,
        },
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
        },
    );

    return <PlaceContext.Provider value={{
        userPlaces,
        setUserPlaces,
        userPlacesLoaded,
        setUserPlacesLoaded,
        userPlacesLoading,
        setUserPlacesLoading,
        placesViewStats,
        setPlacesViewStats,
        placesViewStatLoaded,
        setPlacesViewStatLoaded,
        placesViewStatLoading,
        setPlacesViewStatLoading,
        selectedPlaceId,
        setSelectedPlaceId,
        resetPlaceContext,
    }}>
        {children}

        {
            selectedPlaceId &&
            <BookingForm />
        }
    </PlaceContext.Provider>
}

export default PlaceContextProvider;