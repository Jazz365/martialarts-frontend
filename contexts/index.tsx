import { Suspense } from "react";
import SearchFilterContextProvider from "./SearchFilterContext/SearchFIlterContext";
import UserContextProvider from "./UserContext";
import AppContextProvider from "./AppContext/AppContext";
import BlogContextProvider from "./BlogContext";
import BookingContextProvider from "./BookingContext";
import MapContextProvider from "./MapContext";
import PlaceContextProvider from "./PlaceContext";
import AdminDataContextProvider from "./AdminDataContext/AdminDataContext";

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
    MapContextProvider,
    AppContextProvider,
    UserContextProvider,
    SearchFilterContextProvider,
    BlogContextProvider,
    BookingContextProvider,
    PlaceContextProvider,
    AdminDataContextProvider,
);

export default AppProviders;