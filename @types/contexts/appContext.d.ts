type AppContextType = {
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
}