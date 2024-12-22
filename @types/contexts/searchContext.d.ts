interface AvailableFilters {
    style: string[];
    type_of_place_id: string[];
    caters_to_ids: string[];
    place: string[];
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