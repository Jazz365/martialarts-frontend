interface AvailableFilters {
    style: string[];
    placeType: string[];
    class: string[];
    location: string[];
    name: string[];
    sort: string;
    view: string;
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
}