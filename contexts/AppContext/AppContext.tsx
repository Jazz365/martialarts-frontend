'use client';

import useLoadData from "@/hooks/useLoadData";
import { PlaceService } from "@/services/placeService";
import { createContext, useContext, useState } from "react";
import { initialAppContext } from "./utils";

const AppContext = createContext<AppContextType>(initialAppContext);

export const useAppContext = () => useContext(AppContext);

const AppContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [ allStyles, setAllStyles ] = useState<IMartialArtStyle[]>([]);
    const [ stylesLoading, setStylesLoading ] = useState(true);
    const [ stylesLoaded, setStylesLoaded ] = useState(false);

    const [ catersTo, setCatersTo ] = useState<ICatersTo[]>([]);
    const [ catersToLoading, setCatersToLoading ] = useState(true);
    const [ catersToLoaded, setCatersToLoaded ] = useState(false);

    const [ placeTypes, setPlaceTypes ] = useState<IPlaceType[]>([]);
    const [ placeTypesLoading, setPlaceTypesLoading ] = useState(true);
    const [ placeTypesLoaded, setPlaceTypesLoaded ] = useState(false);

    const [ ageGroups, setAgeGroups ] = useState<IPlaceAgeGroups[]>([]);
    const [ ageGroupsLoading, setAgeGroupsLoading ] = useState(true);
    const [ ageGroupsLoaded, setAgeGroupsLoaded ] = useState(false);

    const [ showPaymentModal, setShowPaymentModal ] = useState(false);

    const placeService = new PlaceService();

    useLoadData(
        stylesLoaded,
        setStylesLoading,
        placeService.getAllStyles.bind(placeService),
        setAllStyles,
        setStylesLoaded,
    );

    useLoadData(
        catersToLoaded,
        setCatersToLoading,
        placeService.getAllCatersTo.bind(placeService),
        setCatersTo,
        setCatersToLoaded,
        {
            hasDependency: true,
            dependency:  stylesLoaded === true
        },
    );

    useLoadData(
        ageGroupsLoaded,
        setAgeGroupsLoading,
        placeService.getAllAgeGroups.bind(placeService),
        setAgeGroups,
        setAgeGroupsLoaded,
        {
            hasDependency: true,
            dependency:  stylesLoaded === true
        },
    );

    useLoadData(
        placeTypesLoaded,
        setPlaceTypesLoading,
        placeService.getAllPlaceTypes.bind(placeService),
        setPlaceTypes,
        setPlaceTypesLoaded,
        {
            hasDependency: true,
            dependency:  stylesLoaded === true
        },
    );

    return <>
        <AppContext.Provider value={{
            allStyles,
            setAllStyles,
            stylesLoaded,
            setStylesLoaded,
            stylesLoading,
            setStylesLoading,
            catersTo,
            setCatersTo,
            catersToLoaded,
            setCatersToLoaded,
            catersToLoading,
            setCatersToLoading,
            placeTypes,
            setPlaceTypes,
            placeTypesLoaded,
            setPlaceTypesLoaded,
            placeTypesLoading,
            setPlaceTypesLoading,
            ageGroups,
            setAgeGroups,
            ageGroupsLoaded,
            setAgeGroupsLoaded,
            ageGroupsLoading,
            setAgeGroupsLoading,
            showPaymentModal,
            setShowPaymentModal,
        }}>
            {children}
        </AppContext.Provider>
    </>
}

export default AppContextProvider;