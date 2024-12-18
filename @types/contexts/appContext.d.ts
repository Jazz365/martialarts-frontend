type AppContextType = {
    selectedPlaceId: number | null; 
    setSelectedPlaceId: (val: number | null) => void;
    allStyles: IMartialArtStyle[];
    setAllStyles: (styles: IMartialArtStyle[]) => void;
    stylesLoading: boolean;
    setStylesLoading: (val: boolean) => void;
    stylesLoaded: boolean;
    setStylesLoaded: (val: boolean) => void;
    catersTo: ICatersTo[];
    setCatersTo: (catersTo: ICatersTo[]) => void;
    catersToLoading: boolean;
    setCatersToLoading: (val: boolean) => void;
    catersToLoaded: boolean;
    setCatersToLoaded: (val: boolean) => void;
    placeTypes: IPlaceType[];
    setPlaceTypes: (types: IPlaceType[]) => void;
    placeTypesLoading: boolean;
    setPlaceTypesLoading: (val: boolean) => void;
    placeTypesLoaded: boolean;
    setPlaceTypesLoaded: (val: boolean) => void;
    userPlaces: IPlace[];
    setUserPlaces: (val: IPlace[]) => void;
    userPlacesLoading: boolean;
    setUserPlacesLoading: (val: boolean) => void;
    userPlacesLoaded: boolean;
    setUserPlacesLoaded: (val: boolean) => void;
    bookings: IBooking[];
    setBookings: (val: IBooking[]) => void;
    bookingsLoading: boolean;
    setBookingsLoading: (val: boolean) => void;
    bookingsLoaded: boolean;
    setBookingsLoaded: (val: boolean) => void;
    placesViewStats: IPlaceViewStat[];
    placesViewStatLoaded: boolean,
    placesViewStatLoading: boolean,
    setPlacesViewStats: (val: IPlaceViewStat[]) => void;
    setPlacesViewStatLoaded: (val: boolean) => void;
    setPlacesViewStatLoading: (val: boolean) => void;
    resetUserInfoInContext: () => void;
}