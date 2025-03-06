'use client'


import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useUserContext } from "../UserContext";
import useLoadData from "@/hooks/useLoadData";
import { AdminService } from "@/services/adminService";
import { useAppContext } from "../AppContext/AppContext";
import { availableFiltersKeys, initialAdminDataContext, initialPlaceFilters } from "./utils";
import { useRouter, useSearchParams } from "next/navigation";

const AdminDataContext = createContext<AdminDataContextType>(initialAdminDataContext);

export const useAdminDataContext = () => useContext(AdminDataContext);

const AdminDataContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const { userDetails } = useUserContext();
    const { stylesLoaded } = useAppContext();

    const [ dashboardData, setDashboardData ] = useState<IDashboardData | null>(null);
    const [ dashboardDataLoading, setDashboardDataLoading ] = useState<boolean>(true);
    const [ dashboardDataLoaded, setDashboardDataLoaded ] = useState<boolean>(false);

    const [ places, setPlaces ] = useState<IPlace[]>([]);
    const [ placesLoading, setPlacesLoading ] = useState<boolean>(true);
    const [ placesLoaded, setPlacesLoaded ] = useState<boolean>(false);

    const [ allBookings, setAllBookings ] = useState<IBooking[]>([]);
    const [ allBookingsLoading, setAllBookingsLoading ] = useState<boolean>(true);
    const [ allBookingsLoaded, setAllBookingsLoaded ] = useState<boolean>(false);

    const [ activePlaceFilters, setActivePlaceFilters ] = useState<AdminPlaceFilters>(initialPlaceFilters);
    
    const adminService = new AdminService();

    const searchParams = useSearchParams();
    const router = useRouter();
    
    const handleUpdatePlaceFiltersForCategory = (category: string, value: string[]) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());

        newSearchParams.delete(category);

        const categoryValue = value;
        
        categoryValue.forEach(searchQuery => {
            newSearchParams.append(category, searchQuery);
        });

        router.push(`?${newSearchParams.toString()}`);
    }

    const placesToDisplay = useMemo<IPlace[]>(() => {
        return places.filter(place => {
            const conditionsMatch =
                (
                    activePlaceFilters.style_id.length === 0 ||
                    place.place_styles.some(styleItem =>
                        activePlaceFilters.style_id
                            .map(Number)
                            .includes(styleItem.id)
                        )
                ) &&
                (  
                    activePlaceFilters.age_group_id.length === 0 ||
                    place.place_age_groups.some(group =>
                        activePlaceFilters.age_group_id
                            .map(Number)
                            .includes(group.id)
                        )
                ) &&
                (
                    activePlaceFilters.caters_to_id.length === 0 ||
                    place.place_caters_to.some(caterItem =>
                        activePlaceFilters.caters_to_id
                            .map(Number)
                            .includes(caterItem.id)
                    )
                ) &&
                (
                    activePlaceFilters.type_of_place_id.length === 0 ||
                    activePlaceFilters.type_of_place_id
                        .map(Number)
                        .includes(place.type_of_place)
                );
    
            return conditionsMatch;
        });
    }, [places, activePlaceFilters]);
    
    useEffect(() => {
        setActivePlaceFilters((prevFilters) => {
            return {
                ...prevFilters,
                ...availableFiltersKeys.reduce((acc, key) => {
                    acc[key] = searchParams.getAll(key);
                    return acc;
                }, {} as AdminPlaceFilters),
            }
        });
    }, [searchParams])
    
    useLoadData(
        dashboardDataLoaded,
        setDashboardDataLoading,
        adminService.getDashboardData.bind(adminService),
        setDashboardData,
        setDashboardDataLoaded,
        {
            authorisationRequired: true,
            hasDependency: true,
            dependency: userDetails !== null && userDetails.is_admin === true && stylesLoaded === true,
        },
    );

    useLoadData(
        placesLoaded,
        setPlacesLoading,
        adminService.getAllPlaces.bind(adminService),
        setPlaces,
        setPlacesLoaded,
        {
            authorisationRequired: true,
            hasDependency: true,
            dependency: userDetails !== null && userDetails.is_admin === true && stylesLoaded === true && dashboardDataLoading !== true,
        },
    );

    useLoadData(
        allBookingsLoaded,
        setAllBookingsLoading,
        adminService.getAllBookings.bind(adminService),
        setAllBookings,
        setAllBookingsLoaded,
        {
            authorisationRequired: true,
            hasDependency: true,
            dependency: userDetails !== null && userDetails.is_admin === true && stylesLoaded === true && dashboardDataLoading !== true,
        },
    );

    return <>
        <AdminDataContext.Provider value={{
            dashboardData,
            setDashboardData,
            dashboardDataLoading,
            setDashboardDataLoading,
            dashboardDataLoaded,
            setDashboardDataLoaded,
            
            placesToDisplay,
            setPlaces,
            placesLoaded,
            setPlacesLoaded,
            placesLoading,
            setPlacesLoading,
            
            activePlaceFilters,
            handleUpdatePlaceFiltersForCategory,
            
            allBookings,
            setAllBookings,
            allBookingsLoaded,
            setAllBookingsLoaded,
            allBookingsLoading,
            setAllBookingsLoading,
        }}>
            {children}
        </AdminDataContext.Provider>
    </>
}

export default AdminDataContextProvider;