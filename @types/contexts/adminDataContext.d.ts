interface AdminPlaceFilters {
    style_id: string[];
    type_of_place_id: string[];
    caters_to_id: string[];
    age_group_id: string[];
    status_type: string[];
}

type AdminDataContextType = {
    dashboardData: IDashboardData | null;
    setDashboardData: (data: IDashboardData | null) => void;
    dashboardDataLoading: boolean;
    setDashboardDataLoading: (val: boolean) => void;
    dashboardDataLoaded: boolean;
    setDashboardDataLoaded: (val: boolean) => void;
    placesToDisplay: IPlace[];
    setPlaces: (data: IPlace[]) => void;
    placesLoaded: boolean;
    setPlacesLoaded: (val: boolean) => void;
    placesLoading: boolean;
    setPlacesLoading: (val: boolean) => void;
    activePlaceFilters: AdminPlaceFilters;
    handleUpdatePlaceFiltersForCategory: (category: string, value: string[]) => void;
    allBookings: IBooking[]
    setAllBookings: (val: IBooking[]) => void;
    allBookingsLoaded: boolean;
    setAllBookingsLoaded: (val: boolean) => void;
    allBookingsLoading: boolean;
    setAllBookingsLoading: (val: boolean) => void;
    users: IUser[];
    setUsers: (val: IUser[]) => void;
    usersLoaded: boolean;
    setUsersLoaded: (val: boolean) => void;
    usersLoading: boolean;
    setUsersLoading: (val: boolean) => void;
}