interface AvailableFilters {
    style_id: string[];
    type_of_place_id: string[];
    caters_to_id: string[];
    age_group_id: string[];
    place: string[];
    name: string[];
    sort: string;
    view: string;
    gender: string;
}

type SearchContextType = {
    activeFilters: AvailableFilters;
    handleUpdateFiltersForCategory: (category: string, value: string[] | string) => void;
    allPlaces: IPlace[];
    setAllPlaces: (val: IPlace[]) => void;
    placesLoading: boolean;
    setPlacesLoading: (val: boolean) => void;
    placesLoaded: boolean;
    setPlacesLoaded: (val: boolean) => void;
    moreResultsLink: string | null | undefined;
    setMoreResultsLink: React.Dispatch<React.SetStateAction<string | null | undefined>>;
    showPopupForFilterPage: boolean;
    setShowPopupForFilterPage: (val: boolean) => void;
    totalResults: number;
    setTotalResults: (val: number) => void;
}