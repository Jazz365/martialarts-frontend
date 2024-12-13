import { Suspense } from "react";
import SearchFilterContextProvider from "./SearchFIlterContext";
import UserContextProvider from "./UserContext";
import CategoryContextProvider from "./CategoryContext";

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
    UserContextProvider,
    CategoryContextProvider,
    SearchFilterContextProvider,
);

export default AppProviders;