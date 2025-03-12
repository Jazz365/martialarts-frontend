type PlaceContextType = {
    userPlaces: IPlace[];
    setUserPlaces: (val: IPlace[]) => void;
    userPlacesLoading: boolean;
    setUserPlacesLoading: (val: boolean) => void;
    userPlacesLoaded: boolean;
    setUserPlacesLoaded: (val: boolean) => void;
    placesViewStats: IPlaceViewStat[];
    placesViewStatLoaded: boolean,
    placesViewStatLoading: boolean,
    setPlacesViewStats: (val: IPlaceViewStat[]) => void;
    setPlacesViewStatLoaded: (val: boolean) => void;
    setPlacesViewStatLoading: (val: boolean) => void;
    selectedPlaceId: number | null; 
    setSelectedPlaceId: (val: number | null) => void;
    resetPlaceContext: () => void;
}