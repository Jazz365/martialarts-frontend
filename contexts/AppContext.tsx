'use client';

import useLoadData from "@/hooks/useLoadData";
import { PlaceService } from "@/services/placeService";
import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext<AppContextType>({
    allStyles: [],
    setAllStyles: () => {},
    stylesLoading: true,
    setStylesLoading: () => {},
    stylesLoaded: false,
    setStylesLoaded: () => {},
    catersTo: [],
    setCatersTo: () => {},
    catersToLoading: true,
    setCatersToLoading: () => {},
    catersToLoaded: false,
    setCatersToLoaded: () => {},
    placeTypes: [],
    setPlaceTypes: () => {},
    placeTypesLoading: true,
    setPlaceTypesLoading: () => {},
    placeTypesLoaded: false,
    setPlaceTypesLoaded: () => {},
    userPlaces: [],
    setUserPlaces: () => {},
    userPlacesLoading: true,
    setUserPlacesLoading: () => {},
    userPlacesLoaded: false,
    setUserPlacesLoaded: () => {},
});

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

    const [ userPlaces, setUserPlaces ] = useState<IPlace[]>([]);
    const [ userPlacesLoading, setUserPlacesLoading ] = useState(true);
    const [ userPlacesLoaded, setUserPlacesLoaded ] = useState(false);
    
    const placeService = new PlaceService();
    
    useLoadData(
        userPlacesLoaded,
        setUserPlacesLoading,
        placeService.getUserPlaces.bind(placeService),
        setUserPlaces,
        setUserPlacesLoaded,
        {
            authorisationRequired: true,
        },
    );

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
    );

    useLoadData(
        placeTypesLoaded,
        setPlaceTypesLoading,
        placeService.getAllPlaceTypes.bind(placeService),
        setPlaceTypes,
        setPlaceTypesLoaded,
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
            userPlaces,
            setUserPlaces,
            userPlacesLoaded,
            setUserPlacesLoaded,
            userPlacesLoading,
            setUserPlacesLoading,
        }}>
            {children}
        </AppContext.Provider>
    </>
}

export default AppContextProvider;