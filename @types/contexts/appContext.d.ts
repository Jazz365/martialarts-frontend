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
    ageGroups: IPlaceAgeGroups[];
    setAgeGroups: (val: IPlaceAgeGroups[]) => void;
    ageGroupsLoading: boolean;
    setAgeGroupsLoading: (val: boolean) => void;
    ageGroupsLoaded: boolean;
    setAgeGroupsLoaded: (val: boolean) => void;
    showPaymentModal: boolean;
    setShowPaymentModal: (val: boolean) => void;
}