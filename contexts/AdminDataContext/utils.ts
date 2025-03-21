export type FilterKeyType = keyof AdminPlaceFilters;

export const availableFiltersKeys: (keyof AdminPlaceFilters)[] = [
    'style_id',
    'type_of_place_id',
    'caters_to_id',
    'age_group_id',
    'status_type',
]

export const filterKeysToCombine: (keyof AdminPlaceFilters)[] = [
    'style_id',
    'type_of_place_id',
    'caters_to_id',
    'age_group_id',
    'status_type',
]

export const initialPlaceFilters = availableFiltersKeys.reduce((acc, key) => {
    acc[key] = [];
    return acc;
}, {} as AdminPlaceFilters);


export const initialAdminDataContext: AdminDataContextType = {
    dashboardData: null,
    setDashboardData: () => {},
    dashboardDataLoading: true,
    setDashboardDataLoading: () => {},
    dashboardDataLoaded: false,
    setDashboardDataLoaded: () => {},
    placesToDisplay: [],
    setPlaces: ()=>{},
    placesLoaded: false,
    setPlacesLoaded: ()=>{},
    placesLoading: true,
    setPlacesLoading: ()=>{},
    activePlaceFilters: initialPlaceFilters,
    handleUpdatePlaceFiltersForCategory: () => [],
    allBookings: [],
    setAllBookings: () => {},
    allBookingsLoaded: false,
    setAllBookingsLoaded: () => {},
    allBookingsLoading: true,
    setAllBookingsLoading: () => {},
    users: [],
    setUsers: () => {},
    usersLoaded: false,
    setUsersLoaded: () => {},
    usersLoading: true,
    setUsersLoading: () => {},
}