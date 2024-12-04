import { Suspense } from "react";
import SearchFilterContextProvider from "./SearchFIlterContext";

const composeProviders = (...providers: ContextProvider[]): ContextProvider => {
    return ({ children }: ContextProviderProps) =>
        providers.reduceRight(
            (acc, Provider) => <Suspense fallback={<></>}>
                <Provider>{acc}</Provider>
            </Suspense>,
            children
        );
};

const AppProviders = composeProviders(
    SearchFilterContextProvider,
);

export default AppProviders;