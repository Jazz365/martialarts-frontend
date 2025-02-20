import { AppConstants } from "@/utils/constants";
import { useEffect } from "react";

interface InfoParams {
    authorisationRequired?: boolean;
    inputParam?: string;
    hasDependency?: boolean;
    dependency?: any;
    useAlternateResDataKey?: boolean;
    alternateResDataKey?: string;
    otherResDataKeys: string[];
}

export default function useLoadData(
    dataLoaded: boolean,
    setDataLoading: (val: boolean) => void,
    dataLoaderFunction: (val?: string | null) => Promise<void>,
    setData: (val: any) => void,
    setDataLoaded: (val: boolean) => void,
    extraInfo: InfoParams = {
        authorisationRequired: false,
        inputParam: '',
        hasDependency: false,
        dependency: null,
        useAlternateResDataKey: false,
        alternateResDataKey: '',
        otherResDataKeys: [],
    },
    setOtherData?: (val: any) => void,
) {
    useEffect(() => {
        const savedToken = AppConstants.savedToken;

        if (extraInfo.hasDependency === true && (extraInfo.dependency === null || extraInfo.dependency === false)) return;

        if (dataLoaded) return setDataLoading(false);

        setDataLoading(true);
        
        dataLoaderFunction(
            extraInfo.authorisationRequired === true ? 
                savedToken 
                : 
            extraInfo.inputParam && extraInfo?.inputParam?.length > 0 ?
                extraInfo.inputParam
            :
            null
        ).then((res: any) => {
            setDataLoading(false);
            setDataLoaded(true);
            
            if (setOtherData && extraInfo.otherResDataKeys.length > 0) {
                const otherDataVals = extraInfo.otherResDataKeys.reduce((acc: any, key: any) => {
                    if (key in res) {
                        acc[key] = res[key];
                    }
                    return acc;
                }, {} as Record<string, any>);
                
                setOtherData(otherDataVals);
            }

            if (extraInfo.useAlternateResDataKey === true && extraInfo.alternateResDataKey) return setData(res[extraInfo.alternateResDataKey]);
            setData(res);
        }).catch(() => {
            setDataLoading(false);
        })
    }, [dataLoaded, extraInfo.hasDependency, extraInfo.dependency])
}