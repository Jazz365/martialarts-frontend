'use client'

import useLoadData from "@/hooks/useLoadData";
import { MapService } from "@/services/mapService";
import { AppConstants } from "@/utils/constants";
import { createContext, useContext, useState } from "react"

const MapContext = createContext<MapContextType>({
    showMap: true,
    setShowMap: () => {},
    mapKey: '',
    setMapKey: () => {},
    mapKeyLoaded: false,
    setMapKeyLoaded: () => {},
    mapKeyLoading: false,
    setMapKeyLoading: () => {},
});

export const useMapContext = () => useContext(MapContext);

const MapContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    const [ showMap, setShowMap ] = useState(true);
    
    const [ mapKey, setMapKey ] = useState('');
    const [ mapKeyLoaded, setMapKeyLoaded ] = useState(false);
    const [ mapKeyLoading, setMapKeyLoading ] = useState(true);

    const mapService = new MapService();

    useLoadData(
        mapKeyLoaded,
        setMapKeyLoading,
        mapService.getMapDetail.bind(mapService),
        setMapKey,
        setMapKeyLoaded,
        {
            saveResToLocalStorage: true,
            resKeyInlocalStorage: AppConstants.mapKey,
        },
    );

    return <MapContext.Provider value={{
        showMap,
        setShowMap,
        mapKey,
        setMapKey,
        mapKeyLoaded,
        setMapKeyLoaded,
        mapKeyLoading,
        setMapKeyLoading,
    }}>
        {children}
    </MapContext.Provider>
}

export default MapContextProvider;