import { AppConstants } from "@/utils/constants";
import { useEffect } from "react";

export default function useLoadData(
    dataLoaded: boolean,
    setDataLoading: (val: boolean) => void,
    dataLoaderFunction: (val?: string | null) => Promise<void>,
    setData: (val: any) => void,
    setDataLoaded: (val: boolean) => void,
    authorisationRequired: boolean = false,
) {
    useEffect(() => {
        const savedToken = AppConstants.getSavedToken();

        if (dataLoaded) return setDataLoading(false);

        setDataLoading(true);
        
        dataLoaderFunction(authorisationRequired ? savedToken : null).then((res: any) => {
            setDataLoading(false);
            setData(res);
            setDataLoaded(true);
        }).catch(() => {
            setDataLoading(false);
        })
    }, [])
}