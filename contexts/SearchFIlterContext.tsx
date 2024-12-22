'use client';


import { listingSortOptions, listingViewTypes } from "@/features/Search/sections/Places/utils";
import useLoadData from "@/hooks/useLoadData";
import { PlaceService } from "@/services/placeService";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

export type FilterKeyType = keyof AvailableFilters;

export const availableFiltersKeys: (keyof AvailableFilters)[] = [
    'style',
    'type_of_place_id',
    'caters_to_ids',
    'place',
    'name',
    'sort',
    'view',
]

const initialActiveFilters = availableFiltersKeys.reduce((acc, key) => {
    if (key === 'sort' || key === 'view') {
        acc[key] = key === 'sort' ? 
            listingSortOptions.sort_by_newest
            :
            listingViewTypes.listView
        ;
    } else {
        acc[key] = [];
    }
    return acc;
}, {} as AvailableFilters);


const SearchFilterContext = createContext<SearchContextType>({
    activeFilters: initialActiveFilters,
    handleUpdateFiltersForCategory: () => {},
    allPlaces: [],
    setAllPlaces: () => {},
    placesLoading: true,
    setPlacesLoading: () => {},
    placesLoaded: false,
    setPlacesLoaded: () => {},
});

export const useSearchFilterContext = () => useContext(SearchFilterContext);


const SearchFilterContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [ activeFilters, setActiveFilters ] = useState<AvailableFilters>(initialActiveFilters);

    const [ allPlaces, setAllPlaces ] = useState<IPlace[]>([]);
    const [ placesLoading, setPlacesLoading ] = useState(true);
    const [ placesLoaded, setPlacesLoaded ] = useState(false);

    const searchParams = useSearchParams();
    const router = useRouter();

    const placeService = new PlaceService();

    const handleUpdateFiltersForCategory = (category: string, value: string[] | string) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());

        newSearchParams.delete(category);

        const categoryValue = Array.isArray(value) ? value: [value]
        
        categoryValue.forEach(searchQuery => {
            newSearchParams.append(category, searchQuery);
        });

        router.push(`?${newSearchParams.toString()}`);
    }
    
    useEffect(() => {
        setActiveFilters((prevFilters) => {
            return {
                ...prevFilters,
                ...availableFiltersKeys.reduce((acc, key) => {
                    if (key === 'sort' || key === 'view') {
                        acc[key] = searchParams.get(key) || '';
                    } else {
                        acc[key] = searchParams.getAll(key);
                    }
                    return acc;
                }, {} as AvailableFilters),
            }
        });
        setPlacesLoaded(false);
    }, [searchParams])

    useLoadData(
        placesLoaded,
        setPlacesLoading,
        placeService.searchPlace.bind(placeService),
        setAllPlaces,
        setPlacesLoaded,
        {
            inputParam: `?${searchParams.toString()}`,
        }
    );

    return <>
        <SearchFilterContext.Provider
            value={{
                activeFilters,
                handleUpdateFiltersForCategory,
                allPlaces,
                setAllPlaces,
                placesLoaded,
                setPlacesLoaded,
                placesLoading,
                setPlacesLoading,
            }}
        >
            {children}
        </SearchFilterContext.Provider>
    </>
}

export default SearchFilterContextProvider;