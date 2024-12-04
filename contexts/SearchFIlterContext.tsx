'use client';


import { listingSortOptions, listingViewTypes } from "@/features/Search/sections/Places/utils";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface AvailableFilters {
    style: string[];
    place: string[];
    class: string[];
    location: string[];
    name: string[];
    sort: string;
    view: string;
}

export type FilterKeyType = keyof AvailableFilters;

export const availableFiltersKeys: (keyof AvailableFilters)[] = [
    'style',
    'place',
    'class',
    'location',
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


const SearchFilterContext = createContext<{
    activeFilters: AvailableFilters;
    handleUpdateFiltersForCategory: (category: string, value: string[] | string) => void;
}>({
    activeFilters: initialActiveFilters,
    handleUpdateFiltersForCategory: () => {},
});

export const useSearchFilterContext = () => useContext(SearchFilterContext);


const SearchFilterContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [ activeFilters, setActiveFilters ] = useState<AvailableFilters>(initialActiveFilters);

    const searchParams = useSearchParams();
    const router = useRouter();

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
    }, [searchParams])

    const handleUpdateFiltersForCategory = (category: string, value: string[] | string) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());

        newSearchParams.delete(category);

        const categoryValue = Array.isArray(value) ? value: [value]
        
        categoryValue.forEach(searchQuery => {
            newSearchParams.append(category, searchQuery);
        });

        router.push(`?${newSearchParams.toString()}`);
    }

    return <>
        <SearchFilterContext.Provider
            value={{
                activeFilters,
                handleUpdateFiltersForCategory,
            }}
        >
            {children}
        </SearchFilterContext.Provider>
    </>
}

export default SearchFilterContextProvider;